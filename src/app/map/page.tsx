"use client";
import { useEffect, useState } from "react";

import { Navigation } from "@/components/NavigationComponent";
import { SelectComponent } from "@/components/SelectComponent";

import list from "../../../sampleData.json";
import { Map } from "../../features/Map";

const MapPage = () => {
  const [decade, setDecade] = useState("2030");
  const [filteredList, setfilteredList] = useState([] as Array<any>);

  useEffect(() => {
    filterList(decade);
  }, []);

  const filterList = (value: string) => {
    const decadeList = list.filter((item) => item.Year === value);
    setfilteredList(decadeList);
    setDecade(value);
  };
  return (
    <div>
      <Navigation homeFlag />
      <SelectComponent decade={decade} filterList={filterList} />
      {filteredList.length && <Map list={filteredList} />}
    </div>
  );
};

export default MapPage;
