import { FC, useEffect, useState } from "react";

interface ComponentProps {
  list: Array<any>;
  COLUMNS: any;
}

const BasicTable: FC<ComponentProps> = ({ list, COLUMNS }) => {
  const [listRisk, setList] = useState(list);
  const [columnList, setcolumnList] = useState(COLUMNS);
  const [sortKey, setSortKey] = useState("");
  const [busCat, setbusCat] = useState("");
  const [risk, setRisk] = useState("");

  useEffect(() => {
    setList(list);
    setcolumnList(COLUMNS);
    resetData();
  }, [list, COLUMNS]);

  const resetData = () => {
    setSortKey("");
    setbusCat("");
    setRisk("");
  };

  const sortList = (item: string) => {
    setSortKey(item);
    const list = [...listRisk];

    if (item === "Risk Rating" && item !== sortKey) {
      list.sort((a, b) => a["Risk Rating"] - b["Risk Rating"]);

      setList(list);
    } else if (item === "Business Category" && item !== sortKey) {
      list.sort((v1, v2) => {
        if (
          v1["Business Category"].toLowerCase() <
          v2["Business Category"].toLowerCase()
        )
          return -1;
        if (
          v1["Business Category"].toLowerCase() >
          v2["Business Category"].toLowerCase()
        )
          return 1;
        return 0;
      });
      setList(list);
    } else if (item === "Asset Name" && item !== sortKey) {
      list.sort((v1, v2) => {
        if (v1["Asset Name"].toLowerCase() < v2["Asset Name"].toLowerCase())
          return -1;
        if (v1["Asset Name"].toLowerCase() > v2["Asset Name"].toLowerCase())
          return 1;
        return 0;
      });
      setList(list);
    } else if (item === "Year" && item !== sortKey) {
      return;
    } else {
      setList(list.reverse());
      setSortKey("");
    }
  };

  const filterList = (value: string, type: string) => {
    if (value === "All" || value === "") {
      setList(list);
    } else {
      const newList = list.filter((item) => item[type] === value);
      setList(newList);
    }
    if (type === "Business Category") {
      setbusCat(value);
      setRisk("");
    } else {
      setRisk(value);
    }
  };

  const generIcon = (data: string) => {
    if (data === sortKey) {
      return (
        <img
          className=" right-0 w-3 absolute top-1/2 rotate-180 -translate-y-2/4"
          src="/favicon.ico"
          alt="Icon"
        />
      );
    } else {
      return (
        <img
          className=" right-0 w-3 absolute top-1/2  -translate-y-2/4"
          src="/favicon.ico"
          alt="Icon"
        />
      );
    }
  };

  return (
    <div className="w-4/6 mx-auto">
      <div>
        <span className="mr-3">Business Category:</span>
        <select
          value={busCat}
          onChange={(e) => filterList(e.target.value, "Business Category")}
          className="text-white bg-black border-b  border-y-white"
        >
          <option value="All">All</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Energy">Energy</option>
          <option value="Manufacturing">Manufacturing</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Retail">Retail</option>
        </select>
      </div>
      <div>
        <span className=" mr-3">Pisk Rate</span>
        <input
          placeholder="Type risk rate"
          className="bg-black text-white border-b w-auto border-y-white"
          value={risk}
          onChange={(e) => filterList(e.target.value, "Risk Rating")}
          type="number"
        />
      </div>
      <table className="w-full mt-14">
        <thead>
          <tr>
            {columnList.map((item: any) => (
              <th
                className="cursor-pointer relative text-left border-b mb-10 border-y-white text-xl "
                key={item.accessor}
                onClick={() => sortList(item.accessor)}
              >
                {item.accessor !== "Year" && generIcon(item.accessor)}
                {item.accessor}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listRisk.map((item: any, index: number) => (
            <tr key={index}>
              {columnList.map((column: any, index: number) => (
                <td className="py-1 " key={`${item.accessor} + ${index}`}>
                  {item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasicTable;
