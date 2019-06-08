var submit = d3.select("#filter-btn");

submit.on("click", function() {
  d3.event.preventDefault();

  console.log('it works')

  document.getElementById("map").innerHTML = ""
  document.getElementById("plot").innerHTML = ""

  var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 8
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
    //console.log(data);
 
  
  var heatArray = [];
  
  
  for (var i = 0; i < data.length; i++) {
      var location = data[i].location;
      if (location){
      heatArray.push([location.pads[0].latitude, logi=location.pads[0].longitude,1]);
      }
  }
  //console.log(heatArray)
  
  var heat = L.heatLayer(heatArray, {
    radius: 50,
    minOpacity: 0.9,
    blur: 100,
    }).addTo(myMap);

  var rocket_fam =[];

  for (var i = 0; i < data.length; i++) {
    var rocket = data[i].rocket;
    if (rocket){
      rocket_fam.push(rocket.familyname);
    }
  };
  
  //console.log(rocket_fam)

  function foo(arr) {
    var a = [], b = [], prev;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    return [a, b];
}

var rawbar=foo(rocket_fam)
console.log(rawbar[1])

var trace1 = {
  x: rawbar[1],
  y: rawbar[0],
  text: rawbar[0],
  name: "rocket family",
  type: "bar",
  orientation: "h"
};

var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Launches for each Rocket Family",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100,
    width: 800,
    height: 500,
  }
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);


});
});