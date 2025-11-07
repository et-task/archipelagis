
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
marker_sources = ["./markers/public_marker_black.png", "./markers/private_marker_black.png", "./markers/hospital_marker_black.png"]

legend.onAdd = function() {

  var div = L.DomUtil.create("div", "legend");
  
  div.innerHTML += "<h4>2024</h4>"; //the 2024 layer legend
  div.innerHTML += "<h5>Elderly population proportion</h5>"; 
  div.innerHTML += '<i style="background: #FFF5E0"></i><span>0 – 3 %</span><br>';
  div.innerHTML += '<i style="background: #FDBB60"></i><span>4 – 15 %</span><br>';
  div.innerHTML += '<i style="background: #F46A25"></i><span>16 – 36 %</span><br>';

  div.innerHTML += "<h4>2045</h4>"; //the 2045 layer legend
  div.innerHTML += "<h5>Elderly population change</h5>"; 
  div.innerHTML += '<i style="background: #2C7BB6"></i><span>-17 – -1 %</span><br>';
  div.innerHTML += '<i style="background: #FFFFBF"></i><span>0 – 10 %</span><br>';
  div.innerHTML += '<i style="background: #FDAE61"></i><span>11 – 25 %</span><br>';
  div.innerHTML += '<i style="background: #D73027"></i><span>26 – 46 %</span><br>';
  div.innerHTML += '<i style="background: #e3e1e1"></i><span>Nodata</span><br>';

  div.innerHTML += "<h4>Medical Services</h4>"; //Medical Services layer legend
  for (var i = 0; i < marker_labels.length; i++) {
        div.innerHTML += ("<img src="+ marker_sources[i] +" height='25' width='25'>") + " " + marker_labels[i] +'<br>';
    }
    
  return div;
};

legend.addTo(map);

// title box and info box
//title and abstract box code adapted from: https://digicampus.fi/mod/folder/view.php?id=363678 excercise material
// Permanent title box (always visible)
if (!window._titleAdded) {
    window._titleAdded = true;
    var title = new L.Control({'position':'bottomleft'});
    title.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'title-box');
        this.update();
        return this._div;
    };
    title.update = function () {
        this._div.innerHTML = '<h2>Elderly Population Projections</h2><p>Southwest Finland 2024-2045</p>';
    };
    title.addTo(map);
}

// Expandable info box (hover to see details)
var abstract = new L.Control({'position':'bottomleft'});
abstract.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'leaflet-control abstract');
    this._div.id = 'abstract';
    this._div.setAttribute("onmouseenter", "abstract.show()");
    this._div.setAttribute("onmouseleave", "abstract.hide()");
    this.hide();
    return this._div;
};
abstract.hide = function () {
    this._div.classList.remove("abstractUncollapsed");
    this._div.classList.add("abstract");
    this._div.innerHTML = 'ℹ️';
};
abstract.show = function () {
    this._div.classList.remove("abstract");
    this._div.classList.add("abstractUncollapsed");
    this._div.innerHTML = `
        <h4>About This Project</h4>
        <p>This map visualizes elderly population projections for municipalities in Southwest Finland.</p>
        <p>Our main focus is on Future Demographic Change and the Spatial Adequacy of Healthcare Infrastructure in SW Finland </p>
        
        <p><strong>Main focus:</strong></p>
        <p>This web map visualizes how demographic change will affect access to health care services across municipalities. 
By comparing the elderly population in 2024 with projected changes in 2045, users can identify regions where health care demand may exceed capacity and where service gaps or pressure areas are likely to emerge. The map supports evidence-based planning for resilient health systems by helping to locate underserved areas, visualize demographic pressure, and anticipate future mismatches between an aging population and health care capacity. </p>
        
        <p><strong>Data:</strong> 
  <a href="https://www.avoindata.fi/data/fi/dataset/varsinais-suomen-ja-satakunnan-palvelupisteet/resource/62943ec3-3e48-44e2-b521-8121a8f579b7" target="_blank">Healthcare services</a> • 
  <a href="https://stat.fi/tup/paavo/paavon_aineistokuvaukset_en.html" target="_blank">Paavo data</a>
</p>
<p class="copyright">&copy; Archipelagis</p>
    `;
};
abstract.addTo(map);
