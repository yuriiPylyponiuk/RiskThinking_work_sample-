import dynamic from "next/dynamic";

export const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

export const MapComponent = (props) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  return (
    <div style={{ aspectRatio: width / height }}>
      <DynamicMap {...props} />
    </div>
  );
};
