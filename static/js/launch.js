var url = "https://launchlibrary.net/1.4/launch/1961-01-01?limit=100000000"
  
  
  d3.json(url, function(response) {
    var data=response.launches
    console.log(data);
 
  var rocket_fam =[];

  for (var i = 0; i < data.length; i++) {
    var rocket = data[i].rocket;
    if (rocket){
      rocket_fam.push(rocket.familyname);
    }
  };

  var country_code=[];

  for (var i = 0; i < data.length; i++) {
    var loc = data[i].location;
    if (loc){
       country_code.push(loc.countryCode);
    }
  };
  
  console.log(country_code)

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
var secondbar=foo(country_code)

console.log(rawbar[1])
console.log(secondbar[1])
console.log(secondbar[0])

var trace= {
  x: rawbar[1],
  y: rawbar[0],
  text: rawbar[0],
  name: "rocket family",
  type: "bar",
  orientation: 'h'
};

var trace2 = {
    x: secondbar[1],
    y: secondbar[0],
    text: secondbar[0],
    name: "country total",
    type: "bar",
    orientation: 'h'
};

var data = [trace];

var data2 = [trace2];

// Apply the group bar mode to the layout
var layout = {
  title: "Total Launches for each Rocket Family",
  yaxis: {
    title: 'Rocket Family',
    titlefont: {
      size: 12,
      color: 'rgb(107, 107, 107)'
    },
    tickfont: {
      size: 10,
      color: 'rgb(107, 107, 107)'
    }
  },
  autosize:true,
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100}
};

var layout2 = {
    title: "Total Launches for each Rocket Family",
    yaxis: {
      title: 'Country Code',
      titlefont: {
        size: 12,
        color: 'rgb(107, 107, 107)'
      },
      tickfont: {
        size: 10,
        color: 'rgb(107, 107, 107)'
      }
    },
    autosize:true,
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100}
  };

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);
Plotly.newPlot("plot2", data2, layout2);

});