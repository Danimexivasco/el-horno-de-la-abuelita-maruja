"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.icon({
  iconUrl:      "/marker-icon.png",
  shadowUrl:    "/marker-shadow.png",
  iconSize:     [25, 41],
  shadowSize:   [41, 41],
  iconAnchor:   [12, 41],
  shadowAnchor: [12, 41],
  popupAnchor:  [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapComponent() {

  const position = [38.360387, -2.100832];

  return (
    <div className="h-[50svh] lg:h-[300px]">
      <MapContainer
        center={{
          lat: position[0],
          lng: position[1]
        }}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={{
            lat: position[0],
            lng: position[1]
          }}
        >
          <Popup>
            Calle la Luz, 02434, Letur
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}