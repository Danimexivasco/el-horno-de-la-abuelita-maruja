"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false
  }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false
  }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false
  }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  {
    ssr: false
  }
);

export default function MapComponent() {
  const [L, setL] = useState<any>(null);
  const position = [38.360387, -2.100832];

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  if (!L) return null;

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
