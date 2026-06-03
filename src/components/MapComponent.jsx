import React, { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { AppContext } from '../context/AppContext';
import goiasGeoJson from '../data/goias.geojson'; // Import the JSON directly in Vite

// Component to handle dynamic map centering
const MapController = () => {
  const map = useMap();
  const { selectedRegional, selectedMacro, regionals } = useContext(AppContext);

  useEffect(() => {
    if (selectedRegional) {
      map.flyTo([selectedRegional.lat, selectedRegional.lng], 10);
    } else if (selectedMacro) {
      const rList = regionals.filter(r => r.macroRegionId === selectedMacro.id);
      if (rList.length > 0) {
        const bounds = L.latLngBounds(rList.map(r => [r.lat, r.lng]));
        map.flyToBounds(bounds, { padding: [50, 50] });
      }
    } else {
      map.flyTo([-15.9324, -50.1414], 7);
    }
  }, [selectedRegional, selectedMacro, map, regionals]);

  return null;
};

const createStarIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<svg class="marker-star" width="32" height="32" viewBox="0 0 24 24" fill="${color}" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

// Calculate distance between two lat/lng points
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);  
  const dLon = (lon2 - lon1) * (Math.PI / 180); 
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
}

const MapComponent = () => {
  const { regionals, macros, setSelectedRegional } = useContext(AppContext);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // Vite pode importar JSON como objeto nativo
    setGeoData(goiasGeoJson);
  }, []);

  // Define o estilo de cada município preenchendo com a cor da Macrorregião mais próxima
  const styleFeature = (feature) => {
    if (!regionals || regionals.length === 0) return { fillColor: '#cccccc', weight: 1, color: '#ffffff', fillOpacity: 0.2 };

    // Get a rough center for the polygon
    let coords = feature.geometry.coordinates[0];
    if (feature.geometry.type === 'MultiPolygon') {
      coords = feature.geometry.coordinates[0][0];
    }
    
    // Calculate bounding box center as a proxy for polygon center
    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    coords.forEach(coord => {
      if (coord[1] < minLat) minLat = coord[1];
      if (coord[1] > maxLat) maxLat = coord[1];
      if (coord[0] < minLng) minLng = coord[0];
      if (coord[0] > maxLng) maxLng = coord[0];
    });
    
    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    // Find nearest Regional Headquarter
    let nearestRegional = regionals[0];
    let minDistance = Infinity;

    regionals.forEach(regional => {
      const dist = getDistanceFromLatLonInKm(centerLat, centerLng, regional.lat, regional.lng);
      if (dist < minDistance) {
        minDistance = dist;
        nearestRegional = regional;
      }
    });

    // Find the Macro Region color
    const macro = macros.find(m => m.id === nearestRegional.macroRegionId);
    const fillColor = macro ? macro.colorHex : '#cccccc';

    return {
      fillColor: fillColor,
      weight: 1, // Borda fina entre as cidades
      opacity: 0.5,
      color: 'rgba(255,255,255,0.5)',
      fillOpacity: 0.6 // Transparencia para ver o mapa base por baixo
    };
  };

  return (
    <div style={{ flex: 1, position: 'relative' }} id="map-export-area">
      <MapContainer 
        center={[-15.9324, -50.1414]} 
        zoom={7} 
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {geoData && (
          <GeoJSON 
            data={geoData} 
            style={styleFeature} 
          />
        )}
        
        <MapController />

        {regionals.map(regional => {
          const macro = macros.find(m => m.id === regional.macroRegionId);
          return (
            <Marker 
              key={regional.id} 
              position={[regional.lat, regional.lng]}
              icon={createStarIcon(macro ? macro.colorHex : '#FFF')}
              eventHandlers={{
                click: () => {
                  setSelectedRegional(regional);
                },
              }}
            >
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{regional.name}</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Igrejas Vinculadas: <b>{regional.churchesCount}</b></p>
                  <span style={{ 
                    display: 'inline-block', 
                    marginTop: '5px', 
                    padding: '3px 8px', 
                    backgroundColor: macro?.colorHex, 
                    color: '#fff', 
                    borderRadius: '12px', 
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {macro?.name}
                  </span>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
