var myMap = L.map("map", {
    center: [40, -85],
    zoom: 3
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

var url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
earthquakeMarkers = [];

function chooseColor(depth) { 
if(depth > 45){
    return "red"
}
else if(depth > 25) {
    return "orange"
}
else if(depth > 5) {
    return "yellow"
}
else {
    return "#90EE90"
}
}
d3.json(url).then(function(response) {

    console.log(response);
    for (var i = 0; i < response.features.length; i++) {
        //console.log(response.features[i].geometry.coordinates[2])  
        L.circle([response.features[i].geometry.coordinates[1], response.features[i].geometry.coordinates[0]], 
            {
                stroke: false,
                fillOpacity: 0.75,
                color: chooseColor(response.features[i].geometry.coordinates[2]),
                fillColor: chooseColor(response.features[i].geometry.coordinates[2]),
                radius: response.features[i].properties.mag * 10000
            }).bindPopup(`<h3>${response.features[i].properties.place}</h3><hr><p>${new Date(response.features[i].properties.time)}</p>`).addTo(myMap);
            
      }

        });

        var legend = L.control({position: 'bottomleft'});
        legend.onAdd = function (map) {
    
        var div = L.DomUtil.create('div', 'info legend');
        labels = ['<strong>Depth</strong>'],
        categories = ['46 and over  ---  Red','26-45  ---  Orange','6-25  ---  Yellow','5 and under  ---  Green'];
    
        for (var i = 0; i < categories.length; i++) {
    
                div.innerHTML += 
                labels.push(
                    '<i class="circle" style="background:"></i> ' +
                (categories[i] ? categories[i] : '+'));
    
            }
            div.innerHTML = labels.join('<br>');
        return div;
        };
        legend.addTo(myMap);