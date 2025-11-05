
/*CONTENTS:
- map initialization
- base layers
- button event bindings
- base layer toggle logic
*/

var map = L.map('map').setView([60.4484, 22.2672], 8);

// Define base layers
var osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19
}).addTo(map);

var satelliteLayer = L.tileLayer('https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=F651PQ3V3To4VcaQBjAv', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>',
  maxZoom: 19
});

// Base layer toggle functionality
var currentBaseLayer = osmLayer;

function toggleBaseLayer(layerType) {
  if (currentBaseLayer) map.removeLayer(currentBaseLayer);

  if (layerType === 'osm') {
    map.addLayer(osmLayer);
    currentBaseLayer = osmLayer;
    document.getElementById('btnOSM').classList.add('active');
    document.getElementById('btnSatellite').classList.remove('active');
  } else if (layerType === 'satellite') {
    map.addLayer(satelliteLayer);
    currentBaseLayer = satelliteLayer;
    document.getElementById('btnOSM').classList.remove('active');
    document.getElementById('btnSatellite').classList.add('active');
  }

  console.log('Switched to ' + layerType + ' base layer');
}

// Set up base layer toggle buttons
document.getElementById('btnOSM').addEventListener('click', function() {
  toggleBaseLayer('osm');
});
document.getElementById('btnSatellite').addEventListener('click', function() {
  toggleBaseLayer('satellite');
});

var baseMaps = {
  "OpenStreetMap": osmLayer,
  "Satellite": satelliteLayer
};

var overlayMaps = {};


//legend code source: https://codepen.io/haakseth/pen/KQbjdO'
//medical marker code source: https://stackoverflow.com/questions/37701211/custom-legend-image-as-legend-in-leaflet-map

var legend = L.control({ position: "bottomright" });

marker_labels = ["Public", "Private", "Hospitals"]
marker_sources = ["./house_marker.png", "./house_marker.png", "./house_marker.png"]

legend.onAdd = function() {

  var div = L.DomUtil.create("div", "legend");
  
  div.innerHTML += "<h4>2024</h4>"; //the 2024 layer legend
  div.innerHTML += '<i style="background: #00cc92","></i><span>2024</span><br>'; 
  div.innerHTML += "<h4>2045</h4>"; //the 2045 layer legend
  div.innerHTML += "<h5>Elderly population change</h5>"; 
  div.innerHTML += '<i style="background: #2C7BB6"></i><span>-17 – -1 %</span><br>';
  div.innerHTML += '<i style="background: #FFFFBF"></i><span>0 – 10 %</span><br>';
  div.innerHTML += '<i style="background: #FDAE61"></i><span>11 – 25 %</span><br>';
  div.innerHTML += '<i style="background: #D73027"></i><span>26 – 46 %</span><br>';
  div.innerHTML += '<i style="background: #e3e1e1"></i><span>Nodata</span><br>';
  div.innerHTML += "<h4>Medical Services</h4>"; //Medical Services layer legend
  for (var i = 0; i < marker_labels.length; i++) {
        div.innerHTML += ("<img src="+ marker_sources[i] +" height='20' width='20'>") + " " + marker_labels[i] +'<br>';
    }
    
  return div;
};

legend.addTo(map);
