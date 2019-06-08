var tbody = d3.select("tbody");
d3.json("/upcomings", function(data){
    data.forEach((record) => {
        var row = tbody.append("tr");
        Object.entries(record).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        console.log("filer data did complete")
        })
})
});