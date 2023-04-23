import { FC } from "react";
import { MapComponent } from "../../components/MapComponent";
import { List, MapPropsType } from "./types";
const DEFAULT_CENTER = [55.907132, -99.036546];

import * as Leaflet from "leaflet";

export const Map: FC<MapPropsType> = ({ list }) => {
  const createColorMarker = (risk: string) => {
    const riskNum = Number(risk);
    let myCustomColour = "red";

    if (riskNum < 0.25) {
      myCustomColour = "green";
    } else if (riskNum > 0.25 && riskNum < 0.5) {
      myCustomColour = "blue";
    } else {
      myCustomColour = "red";
    }

    const markerHtmlStyles = `
    background-color: ${myCustomColour};
    width: 2rem;
    height: 2rem;
    display: block;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 2rem 2rem 0;
    transform: rotate(45deg);
    border: 1px solid #000`;

    const icon = Leaflet.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 24],
      popupAnchor: [0, -36],
      html: `<span style="${markerHtmlStyles}" />`,
    });

    return icon;
  };

  return (
    <div>
      <MapComponent
        width="1000"
        height="600"
        center={DEFAULT_CENTER}
        zoom={3.5}
      >
        {({ TileLayer, Marker, Popup }: List) => (
          <>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {list.map((item: any, index: number) => {
              const icon = createColorMarker(item["Risk Rating"]);
              return (
                <Marker
                  style={{ filter: `hue-rotate(${-139}deg)` }}
                  key={index}
                  icon={icon}
                  position={[item.Lat, item.Long]}
                >
                  <Popup sryle={{ color: "red" }}>
                    <p>{`Asset Name: ${item["Asset Name"]} `} </p>

                    <p>{`Business Category: ${item["Business Category"]} `}</p>
                  </Popup>
                </Marker>
              );
            })}
          </>
        )}
      </MapComponent>
    </div>
  );
};
