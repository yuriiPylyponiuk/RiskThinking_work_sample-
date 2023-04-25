import React, { FC } from "react";

interface SelectComponentPropType {
  decade: string;
  filterList: (a: string) => void;
}

export const SelectComponent: FC<SelectComponentPropType> = ({
  decade,
  filterList,
}) => {
  return (
    <div className="w-4/6 mx-auto mt-14">
      <span>Select Decade: </span>
      <select
        value={decade}
        onChange={(e) => filterList(e.target.value)}
        className="text-white bg-black"
      >
        <option value="2030">2030</option>
        <option value="2040">2040</option>
        <option value="2050">2050</option>
        <option value="2060">2060</option>
        <option value="2070">2070</option>
      </select>
    </div>
  );
};
