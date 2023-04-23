"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Map } from "../features/Map";

import list from "../../sampleData.json";

export default function Home() {
  const [decade, setDecade] = useState("2030");
  const [filteredList, setfilteredList] = useState(list);

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
      <h1>Test exercise</h1>
      <select
        value={decade}
        onChange={(e) => filterList(e.target.value)}
        className="text-black"
      >
        <option value="2030">2030</option>
        <option value="2040">2040</option>
        <option value="2050">2050</option>
        <option value="2060">2060</option>
        <option value="2070">2070</option>
      </select>
      <Link href="/test">Home</Link>
      <Map list={filteredList} />
    </div>
  );
}
