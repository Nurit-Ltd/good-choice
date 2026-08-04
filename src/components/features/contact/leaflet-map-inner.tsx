"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_COORDS: [number, number] = [25.275, 51.428];

// Custom Red Pin Marker Icon
const redPinIcon = L.divIcon({
  className: "custom-map-pin",
  html: `<div class="relative flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#DC2626" class="w-9 h-9 drop-shadow-md">
      <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
    </svg>
  </div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Helper component to dynamically re-center map when coords/zoom update
function RecenterMap({ coords, zoom }: { coords: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, zoom);
    map.invalidateSize();
  }, [map, coords, zoom]);
  return null;
}

export interface LeafletMapInnerProps {
  coords?: [number, number];
  zoom?: number;
  storeName?: string;
  address?: string;
  mapsUrl?: string;
}

export default function LeafletMapInner({
  coords = DEFAULT_COORDS,
  zoom = 14,
  storeName = "Good Choice Furniture",
  address = "C.R. No:82686, Muaither, Umm Al Dome St, Doha, Qatar, Ar Rayyan",
  mapsUrl,
}: LeafletMapInnerProps) {
  const markerRef = useRef<L.Marker>(null);
  const mapActionUrl = mapsUrl || `https://maps.google.com/?q=${coords[0]},${coords[1]}`;

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [coords]);

  return (
    <div className="w-full h-full relative">
      <style jsx global>{`
        /* Custom Leaflet Popup Reset & Styling */
        .leaflet-popup-content-wrapper {
          padding: 0 !important;
          border-radius: 8px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
          overflow: hidden !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .leaflet-container a.leaflet-popup-close-button {
          color: #62103a !important;
          padding: 6px 8px 0 0 !important;
          z-index: 20;
        }
        .leaflet-container a.map-action-btn,
        .leaflet-popup-content a {
          color: #ffffff !important;
          text-decoration: none !important;
        }
        .leaflet-popup-tip {
          background-color: #62103a !important;
        }
      `}</style>

      <MapContainer
        center={coords}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap coords={coords} zoom={zoom} />

        <Marker ref={markerRef} position={coords} icon={redPinIcon}>
          <Popup autoClose={false} closeOnClick={false} className="custom-location-popup">
            {/* Tooltip Card Matching Figma Design */}
            <div className="bg-white text-center w-62.5 sm:w-70 flex flex-col items-center">
              {/* White Top Portion */}
              <div className="p-5 flex flex-col items-center w-full">
                <h4
                  className="font-heading text-lg sm:text-xl font-medium tracking-tight mb-2"
                  style={{ color: "var(--color-primary-950, #62103A)" }}
                >
                  {storeName}
                </h4>
                <p
                  className="font-body text-xs leading-relaxed text-grey-600 whitespace-pre-line"
                  style={{ color: "var(--color-grey-600, #656565)" }}
                >
                  {address}
                </p>
              </div>

              {/* Maroon Bottom Portion: View Larger Map */}
              <a
                href={mapActionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-action-btn w-full py-3 bg-primary-950 text-white! font-body text-xs font-medium tracking-wide hover:bg-[#4d0c2d] transition-colors block text-center"
                style={{ color: "#ffffff" }}
              >
                View Larger Map
              </a>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
