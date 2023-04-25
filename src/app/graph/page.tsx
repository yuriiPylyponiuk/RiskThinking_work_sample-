"use client";
import { ChartComponent } from "@/components/ChartComponent";
import { Navigation } from "@/components/NavigationComponent";
import list from "../../../sampleData.json";

const Graph = () => {
  return (
    <>
      <Navigation homeFlag />
      <ChartComponent list={list} />
    </>
  );
};

export default Graph;
