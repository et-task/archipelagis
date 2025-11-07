/* CONTENTS:
- all logic to paavo datasets
*/

var currentPaavoLayer = null;
var paavo2024Layer = null;
var paavo2045Layer = null;

// Interaction handlers for Paavo data
function addPaavoInteractions(layer) {
  layer.on({
    mouseout: function(e) {
      for (var i in e.target._eventParents) {
        e.target._eventParents[i].resetStyle(e.target);
      }
    },
    mouseover: function(e){
      var t = e.target;
      if (t.setStyle) t.setStyle({ weight: 3, color: '#666' });
    },
    click: function(e){
      if (e.target && e.target._bounds) {
        map.fitBounds(e.target.getBounds());
      }
    }
  });
}

// Popup for 2024 layer
function pop_paavo_2024(feature, layer) {
  addPaavoInteractions(layer);
  var props = feature.properties || {};
  var areaKm2 = (props.area != null && !isNaN(props.area)) ? (props.area / 1000000).toFixed(2) + ' km²' : '';
  var popupContent = '<table>' +
      '<tr><th scope="row">Municipality</th><td>' + props.mun + '</td></tr>' +
      '<tr><th scope="row">Year</th><td>2024</td></tr>' +
      '<tr><th scope="row">Elderly (65+)</th><td>' + props.elderly + '</td></tr>' +
      '<tr><th scope="row">Area</th><td>' + areaKm2 + '</td></tr>' +
      '</table>';
  layer.bindPopup(popupContent, { maxHeight: 400 });
}

// Popup for 2045 layer
function pop_paavo_2045(feature, layer) {
  addPaavoInteractions(layer);
  var props = feature.properties || {};
  var areaKm2 = (props.area != null && !isNaN(props.area)) ? (props.area / 1000000).toFixed(2) + ' km²' : '';
  var elderly2045 = props['2045_65-74'] + props['2045_75-'];

  //in case the elderly population was 0 in 2024
  if (props['elderly'] == 0) {
    var percentage = '+';
  } else {
    var percentage = Math.round((elderly2045-props['elderly'])/props['elderly']*100) + ' %';
  }
  if (props['2045_total'] != null) {
    var projected_total = props['2045_total']
  } else {
    projected_total = 'N/A'; //not available
  }
  
  //var difference = elderly2045 - props['elderly'];
  //var percentage = Math.round((elderly2045 - props['elderly'])/elderly2045*100) + ' %';
  var popupContent = '<table>' +
      '<tr><th scope="row">Municipality</th><td>' + props.mun + '</td></tr>' +
      '<tr><th scope="row">Year</th><td>2045</td></tr>' +
      '<tr><th scope="row">Elderly (65+)</th><td>' + elderly2045 + '</td></tr>' +
      '<tr><th scope="row">Change in elderly</th><td>' + percentage + '</td></tr>' +
      '<tr><th scope="row">Projected total</th><td>' + projected_total + '</td></tr>' +
      '<tr><th scope="row">Area</th><td>' + areaKm2 + '</td></tr>' +
      '</table>';
  layer.bindPopup(popupContent, { maxHeight: 400 });
}


function style_paavo_2045(feature) {
  var props = feature.properties || {};
  var elderly2045 = props['2045_65-74'] + props['2045_75-'];
  var percentage = Math.round((elderly2045-props['elderly'])/props['elderly']*100)
  //added ()
  if (percentage >= -17 && percentage <0) {
    return {
      opacity: 0.9,
      color: 'rgba(0,0,0,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1.0, 
      fill: true,
      fillOpacity: 0.6,
      fillColor: '#2C7BB6',
      interactive: true, }
  } else if (percentage >= 0 && percentage <=10) {
    return {
      opacity: 0.9,
      color: 'rgba(1,1,1,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1.0, 
      fill: true,
      fillOpacity: 0.6,
      fillColor: '#FFFFBF',
      interactive: true, }  
  } else if (percentage > 10 && percentage <=25) {
    return {
      opacity: 0.9,
      color: 'rgba(0,0,0,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1.0, 
      fill: true,
      fillOpacity: 0.6,
      fillColor: '#FDAE61',
      interactive: true, }
  } else if (percentage > 25 && percentage <=46) {
    return {
      opacity: 0.9,
      color: 'rgba(0,0,0,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1.0, 
      fill: true,
      fillOpacity: 0.6,
      fillColor: '#D73027',
      interactive: true, }
  } else {
    return {
      opacity: 0.9,
      color: 'rgba(0,0,0,1.0)',
      dashArray: '',
      lineCap: 'butt',
      lineJoin: 'miter',
      weight: 1.0, 
      fill: true,
      fillOpacity: 0.6,
      fillColor: '#e3e1e1',
      interactive: true, }
  }
}



// Toggle between 2024 and 2045 layers
function togglePaavoLayer(year) {
  if (currentPaavoLayer) map.removeLayer(currentPaavoLayer);

  if (year === '2024' && paavo2024Layer) {
    map.addLayer(paavo2024Layer);
    currentPaavoLayer = paavo2024Layer;
    document.getElementById('btn2024').classList.add('active');
    document.getElementById('btn2045').classList.remove('active');
  } else if (year === '2045' && paavo2045Layer) {
    map.addLayer(paavo2045Layer);
    currentPaavoLayer = paavo2045Layer;
    document.getElementById('btn2024').classList.remove('active');
    document.getElementById('btn2045').classList.add('active');
  }

  console.log('Switched to ' + year + ' data');
}
