"use client";
/* eslint-disable react/jsx-no-comment-textnodes */
//@ts-nocheck
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MapComponent from "../components/MapComponent";
const DEFAULT_CENTER = [38.907132, -77.036546];
export default function Home() {
  return (
    <div>
      <h1>Test exercise</h1>
      <MapComponent width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
        {({ TileLayer, Marker, Popup }) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={DEFAULT_CENTER}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </>
        )}
      </MapComponent>
    </div>
  );
}
