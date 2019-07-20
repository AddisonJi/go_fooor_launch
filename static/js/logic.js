var submit = d3.select("#filter-btn");

submit.on("click", function() {
  d3.event.preventDefault();

  console.log('it works')

  document.getElementById("map").innerHTML = ""
  document.getElementById("plot").innerHTML = ""
  
  // my heat map:
  var myMap = L.map("map", {
    center: [41.2565, -95.9345],
    zoom: 4
  });
  
  var API_KEY="pk.eyJ1IjoiYWRkaXNvbmppIiwiYSI6ImNqdnBzdWN3bjJkMmU0YW9pY2xrNWd0aHEifQ.pCuvWrxKXG6V6qrlAxKQuQ"
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
  }).addTo(myMap)
 
  var startdate=d3.select("#sd").property("value")
  var enddate=d3.select("#ed").property("value")
  console.log(startdate)
  console.log(enddate)
  
  var url = `https://launchlibrary.net/1.4/launch/${startdate}/${enddate}?limit=100000`
  
  
  d3.json(url, function(response) {
    var data=response.launches
    console.log(data);
 
  
    var heatArray = [];
    var markers = new L.markerClusterGroup();
    
    for (var i = 0; i < data.length; i++) {
        var location = data[i].location;
        if (location){
        heatArray.push([location.pads[0].latitude, location.pads[0].longitude,1]);
        }
    }

    for (var i = 0; i < data.length; i++) {
      var location = data[i].location;
      if (location){
        console.log(data[i].rocket.imageURL)
      markers.addLayer(L.marker([location.pads[0].latitude, location.pads[0].longitude]).bindPopup("<img src='" + data[i].rocket.imageURL + "' width='150px'/><h6>"+ data[i].name+"</h6>"))
      }
  }

    
    var heat = L.heatLayer(heatArray, {
      radius: 50,
      minOpacity: 0.9,
      blur: 100,
      }).addTo(myMap);

      myMap.addLayer(markers);
  
      
//my heat map ends here
});
});