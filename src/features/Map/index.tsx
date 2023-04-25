import { FC } from "react";
import { MapComponent } from "../../components/MapComponent";
import { List, MapPropsType } from "./types";
const DEFAULT_CENTER = [55.907132, -99.036546];

export const Map: FC<MapPropsType> = ({ list }) => {
  return (
    <div className="w-4/6 mx-auto mt-14">
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
              return (
                <Marker
                  style={{ filter: `hue-rotate(${-139}deg)` }}
                  key={index}
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
