"use client";
import { Navigation } from "@/components/NavigationComponent";
import { SelectComponent } from "@/components/SelectComponent";
import TableComponent from "@/components/TableComponent";
import { log } from "console";
import React, { useEffect, useState } from "react";
import { COLUMNS } from "../../../colums";
import list from "../../../sampleData.json";

const Table = () => {
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
      {filteredList.length && (
        <TableComponent list={filteredList} COLUMNS={COLUMNS} />
      )}
    </div>
  );
};

export default Table;
