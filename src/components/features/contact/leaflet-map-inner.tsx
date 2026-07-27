"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const QATAR_COORDS: [number, number] = [25.275, 51.428];

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

// Helper component to open popup automatically on load
function AutoOpenPopup() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

export default function LeafletMapInner() {
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
        center={QATAR_COORDS}
        zoom={14}
        scrollWheelZoom={false}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <AutoOpenPopup />

        <Marker position={QATAR_COORDS} icon={redPinIcon}>
          <Popup autoClose={false} closeOnClick={false} className="custom-location-popup">
            {/* Tooltip Card Matching Figma Design */}
            <div className="bg-white text-center w-[250px] sm:w-[280px] flex flex-col items-center">
              {/* White Top Portion */}
              <div className="p-5 flex flex-col items-center w-full">
                <h4
                  className="font-heading text-lg sm:text-xl font-medium tracking-tight mb-2"
                  style={{ color: "var(--color-primary-950, #62103A)" }}
                >
                  Good Choice <br /> Furniture-1
                </h4>
                <p
                  className="font-body text-xs leading-relaxed text-[#656565]"
                  style={{ color: "var(--color-grey-600, #656565)" }}
                >
                  C.R. No:82686, Muaither, <br />
                  Umm Al Dome St, Doha, <br />
                  Qatar, Ar Rayyan
                </p>
              </div>

              {/* Maroon Bottom Portion: View Larger Map */}
              <a
                href={`https://maps.google.com/?q=${QATAR_COORDS[0]},${QATAR_COORDS[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-action-btn w-full py-3 bg-[#62103A] !text-white font-body text-xs font-medium tracking-wide hover:bg-[#4d0c2d] transition-colors block text-center"
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
