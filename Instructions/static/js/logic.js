var EarthUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


d3.json(EarthUrl).then(function (data) {
    createFeatures(data.features);
  });


function createFeatures(earthquakeInfo){
    function getRadius(mag){
        return mag * 3
    }

function assignColor(feature){
    let depth = feature.geometry.coordinates[2];
    let color = "blue"
    if      
        ( depth > 90) { color = "red" }
    else if 
        ( depth > 70) { color = "green"}
    else if 
        ( depth > 50) { color = "yellow" }
    else if 
        ( depth > 30) { color = "orange" }
    else if 
        ( depth > 10) { color = "purple" }
    return(color)
  }

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${(feature.properties.mag)}<br>Depth: ${(feature.geometry.coordinates[2])}</p>`);
  }

  function pointToLayer (feature, latlng) {
    return new L.CircleMarker (latlng,  
                                {   radius : getRadius(feature.properties.mag),
                                    color : 'green',
                                    fillColor : assignColor(feature),
                                    fillOpacity : 1,
                                    weight : 1 

    }
    );
  }

 var quakes_map = L.geoJSON(earthquakeInfo, {
        pointToLayer : pointToLayer,
        onEachFeature : onEachFeature
    });
    createMap(quakes_map);
  }
function createMap(quakes_map){

var openstreet = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });



  var streetMap = {
    "Map": openstreet
  };

  var overlayMap = {
    Earthquakes: quakes_map
  };

  var eMap = L.map("map", {
    center: [ 38.50, -97.20 ],
    zoom: 3,
    layers: [openstreet, quakes_map]
  });


  L.control.layers(
      streetMap,
     overlayMap
    , {
    collapsed: false
  }).addTo(eMap);

}
