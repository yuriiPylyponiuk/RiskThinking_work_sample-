import Link from "next/link";
import { FC } from "react";

interface NavigationPropTypes {
  homeFlag?: boolean;
}

export const Navigation: FC<NavigationPropTypes> = ({ homeFlag = false }) => {
  return (
    <div className="flex justify-around w-10/12 m-auto mt-16">
      {homeFlag && (
        <Link className="border-b border-white" href="/">
          Home
        </Link>
      )}
      <Link className="border-b border-white" href="/map">
        Map
      </Link>
      <Link className="border-b border-white" href="/table">
        Table
      </Link>
      <Link className="border-b border-white" href="/graph">
        Graph
      </Link>
    </div>
  );
};
