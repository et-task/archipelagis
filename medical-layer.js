/*CONTENTS:
- medical service layer logic
*/


//medical layer pop-up
function pop_medical(feature, layer) {
    const props = feature.properties || {};
    let popupContent = (props.kohteen_ni || '') + '</h3><table>';
    let service_type;
    if (props.palvelukoh == 'Kunnalliset terveyskeskukset') {
      service_type = 'Municipal Health Centers'
    }
    else if (props.palvelukoh == 'Yksityiset lääkäripalvelut') {
      service_type = 'Private Medical Services'
    } else if (props.palvelukoh == 'Sairaalat') {
      service_type = "Hospitals"
    }
    
    if (service_type) {
    popupContent += '<tr><th scope="row">Service Type</th><td>' + service_type + '</td></tr>';
    }
    //if (props.palvelut) {
    //popupContent += '<tr><th scope="row">Services</th><td>' + props.palvelut + '</td></tr>';
    //}
    popupContent += '</table></div>';
    layer.bindPopup(popupContent, { maxHeight: 400, maxWidth: 400 });
}

//adding the markers
/*function addPointToLayer(feature, latlng) {
    return L.marker(latlng, {
    icon: medicalIcon, //style in layer-styles.js
    title: feature.properties.name || 'Medical Service',
    interactive: true
    });
}*/

function addPointToLayer(feature, latlng) {
  const type = feature.properties.palvelukoh; //"hospital", "public", "private"

  let icon;
  if (type === 'Kunnalliset terveyskeskukset') {
    icon = publicIcon;
  } else if (type === 'Sairaalat') {
    icon = hospitalIcon;
  } else if (type === 'Yksityiset lääkäripalvelut') {
    icon = privateIcon;
  } else {
    icon = medicalIcon; // default fallback?
  }

  return L.marker(latlng, {
    icon: icon,
    title: feature.properties.name || 'Medical Service',
    interactive: true
  });
}
