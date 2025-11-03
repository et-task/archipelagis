/* CONTENTS
- sequential loading
- layer control setup
- final attribution
*/

// === Sequential Layer Loading ===
console.log('Starting to load all layers...');

loadGeoJSON('./docs/SW_geo.geojson', {
  style: layerStyles.base,
})
.then(function(layer) {
  overlayMaps["SW Finland"] = layer;

  return loadGeoJSON('./docs/paavo_2024/paavo_SW_2024.geojson', {
    style: layerStyles.paavo2024,
    onEachFeature: pop_paavo_2024
  });
})
.then(function(layer) {
  paavo2024Layer = layer;

  return loadGeoJSON('./docs/paavo_2045/paavo_sw_2045.geojson', {
    style: style_paavo_2045,
    onEachFeature: pop_paavo_2045
  });
})
.then(function(layer) {
  paavo2045Layer = layer;

  document.getElementById('btn2024').addEventListener('click', function() {
    togglePaavoLayer('2024');
  });
  document.getElementById('btn2045').addEventListener('click', function() {
    togglePaavoLayer('2045');
  });

  //the following code makes the slider appear but does not work correctly
  //problem: these layers are GeoJSON and not tile layers (like the OSM and Satellite)
  /*if (paavo2024Layer && paavo2045Layer) {
    L.control.sideBySide(paavo2024Layer, paavo2045Layer).addTo(map);
  }*/

  return loadMedicalServices();
})
.then(function(medicalLayer) {
  if (medicalLayer && medicalLayer.layer) {
    overlayMaps[medicalLayer.name] = medicalLayer.layer;
    medicalLayer.layer.addTo(map);

    togglePaavoLayer('2024');

    setTimeout(() => {
      try {
        const bounds = medicalLayer.layer.getBounds();
        if (bounds && bounds.isValid()) map.fitBounds(bounds);
      } catch (error) {
        console.log('Could not fit bounds to medical services:', error);
      }
    }, 1000);
  }
  L.control.layers(baseMaps, overlayMaps).addTo(map);


})
.catch(function(error) {
  console.error("Error loading layers:", error);
  L.control.layers(baseMaps, overlayMaps).addTo(map);
});


// Add attribution
map.attributionControl.addAttribution('&copy; <a href="http://teamwebsite.com">Archipelagis</a>');


