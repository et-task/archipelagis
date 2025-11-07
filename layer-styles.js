// Centralized GeoJSON layer style definitions

const layerStyles = {
  base: {
    color: "#0033cc",
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.2
  },
  paavo2024: {
    color: "#00cc92",
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.2
  },
  paavo2045: {
    color: "#cc4400",
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.2
  }
};

//marker styles for service point data
var medicalIcon = L.icon({
  className: 'medical-marker',
  iconUrl: './house_marker.png', //url of the medical point png

  iconSize:     [40, 40], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

var hospitalIcon = L.icon({
  className: 'medical-marker',
  iconUrl: './markers/hospital_marker_black.png', //url 

  iconSize:     [20, 20], 
  iconAnchor:   [10, 10],
  popupAnchor:  [-3, -76] 
});

var publicIcon = L.icon({
  className: 'medical-marker',
  iconUrl: './markers/public_marker_black.png', //url 

  iconSize:     [20, 20], 
  iconAnchor:   [10, 10], 
  popupAnchor:  [-3, -76] 
});

var privateIcon = L.icon({
  className: 'medical-marker',
  iconUrl: './markers/private_marker_black.png', //url 

  iconSize:     [20, 20], 
  iconAnchor:   [10, 10], 
  popupAnchor:  [-3, -76] 
});

//house_marker.png source:
//<a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps and location icons">Maps and location icons created by juicy_fish - Flaticon</a>

//to change the marker size according to zoom level
map.on('zoom', function() {
  const zoom = map.getZoom();
  const scale = Math.pow(5, zoom - 10); 
  const markerElems = document.getElementsByClassName('medical-marker');

  for (let elem of markerElems) {
    elem.style.transform = `scale(${scale})`;
    elem.style.transformOrigin = 'center';
  }
});

//html: '<div style="background-color: red; width: 10px; height: 10px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px black;"></div>',
