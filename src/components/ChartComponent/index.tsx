import { Chart } from "chart.js";
import _ from "lodash";
import { FC, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface ChartComponentPropsType {
  list: Array<any>;
}

const years = ["2030", "2040", "2050", "2060", "2070"];

export const ChartComponent: FC<ChartComponentPropsType> = ({ list }) => {
  const [category, setCategory] = useState(_.uniqBy(list, "Business Category"));
  const [selectCategory, setSelectCategory] = useState("Select");
  const [listByCat, setlistByCat] = useState([] as Array<any>);
  const [name, setName] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [listByCatName, setlistByCatName] = useState([] as Array<any>);
  const [uniqBylong, setUniqBylong] = useState([] as Array<any>);
  const [uniqBylat, setuniqUniqBylat] = useState([] as Array<any>);
  const [listByLong, setListByLong] = useState([] as Array<any>);
  const [listByLat, setListByLat] = useState([] as Array<any>);
  const [finalList, setFinalList] = useState([] as Array<number>);
  const inputRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let ctx;
    let myChart;
    if (inputRef.current != null) {
      ctx = inputRef.current.getContext("2d");
    }

    if (ctx != undefined && finalList.length > 0) {
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: years,
          datasets: [
            {
              data: finalList,
              label: `${listByCatName[0]["Asset Name"]}   Risk Rating`,
              borderColor: "#3e95cd",
              backgroundColor: "#7bb6dd",
              fill: false,
            },
          ],
        },
      });
    }
  }, [finalList]);

  const filterList = (value: string, type: string) => {
    if (type === "Business Category") {
      setlistByCat(list.filter((item) => item[type] === value));
      setSelectCategory(value);
      resetState("bc");
    } else if (type === "Asset Name") {
      const newArray = listByCat.filter((item) =>
        _.includes(item[type], value)
      );
      setlistByCatName(newArray);
      setUniqBylong(_.uniqBy(newArray, "Long"));
      resetState("bcn");
      setName(value);
    } else if (type === "Long") {
      const newList = listByCatName.filter((item) =>
        _.includes(item[type], value)
      );
      setListByLong(newList);
      resetState("long");
      setuniqUniqBylat(_.uniqBy(newList, "Long"));
      setLong(value);
    } else if (type === "Lat") {
      const newList = listByLong.filter((item) =>
        _.includes(item[type], value)
      );
      newList.sort((a, b) => a["Year"] - b["Year"]);
      setListByLat(newList);
      setFinalList(newList.map((item) => Number(item["Risk Rating"])));
      setLat(value);
    }
  };

  const resetState = (data: string) => {
    if (data === "bc") {
      setName("");
      setLong("");
      setlistByCatName([]);
      setUniqBylong([]);
      setListByLong([]);
    } else if (data === "bcn") {
      setLong("");
      setListByLong([]);
    } else if (data === "long") {
    }
    setLat("");
    setuniqUniqBylat([]);
    setListByLat([]);
    setFinalList([]);
  };

  return (
    <div>
      {!finalList.length ? (
        <h2 className="w-2/4 text-center mx-auto mt-10 text-xl font-semibold capitalize ">
          line Chart. Select item by filters below
        </h2>
      ) : (
        <h1 className="w-[110px] mx-auto mt-10 text-xl font-semibold capitalize ">
          line Chart
        </h1>
      )}
      <div className="flex mt-14 w-3/5 mx-auto">
        <div className="mr-10">
          <span>Select Type: </span>
          <select
            value={selectCategory}
            onChange={(e) => filterList(e.target.value, "Business Category")}
            className="text-white bg-black"
          >
            <option value="Select">Select</option>
            {category.map((item) => (
              <option key={uuidv4()} value={item["Business Category"]}>
                {item["Business Category"]}
              </option>
            ))}
          </select>
        </div>
        {listByCat.length > 0 && (
          <div className="mr-10">
            <span>Type name: </span>
            <input
              placeholder="Type Asset Name"
              className=" bg-black text-white border-b w-auto border-y-white"
              value={name}
              onChange={(e) => filterList(e.target.value, "Asset Name")}
              type="text"
            />
          </div>
        )}
        {listByCatName.length > 0 && (
          <div className="mr-10">
            <span>Select Longetude: </span>
            <select
              value={long}
              onChange={(e) => filterList(e.target.value, "Long")}
              className="text-white bg-black"
            >
              <option value="Select">Select</option>
              {uniqBylong.map((item) => (
                <option key={uuidv4()} value={item["Long"]}>
                  {item["Long"]}
                </option>
              ))}
            </select>
          </div>
        )}
        {listByLong.length > 0 && (
          <div className="mr-10">
            <span>Latitude</span>
            <select
              value={lat}
              onChange={(e) => filterList(e.target.value, "Lat")}
              className="text-white bg-black"
            >
              <option value="Select">Select</option>
              {uniqBylat.map((item) => (
                <option key={uuidv4()} value={item["Lat"]}>
                  {item["Lat"]}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {finalList.length > 0 && listByLat.length > 0 && (
        <div className="w-[1100px] h-screen flex mx-auto my-auto">
          <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit mt-14  shadow-xl">
            <canvas ref={inputRef}></canvas>
          </div>
        </div>
      )}
    </div>
  );
};
