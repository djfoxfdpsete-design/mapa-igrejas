import React, { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { AppContext } from '../context/AppContext';

// Component to handle dynamic map centering
const MapController = () => {
  const map = useMap();
  const { selectedRegional, selectedMacro, regionals } = useContext(AppContext);

  useEffect(() => {
    if (selectedRegional) {
      map.flyTo([selectedRegional.lat, selectedRegional.lng], 10);
    } else if (selectedMacro) {
      // Find regionals for this macro and fit bounds
      const rList = regionals.filter(r => r.macroRegionId === selectedMacro.id);
      if (rList.length > 0) {
        const bounds = L.latLngBounds(rList.map(r => [r.lat, r.lng]));
        map.flyToBounds(bounds, { padding: [50, 50] });
      }
    } else {
      map.flyTo([-15.9324, -50.1414], 7); // Center of Goias
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

const MapComponent = () => {
  const { regionals, macros, setSelectedRegional } = useContext(AppContext);

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
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
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
