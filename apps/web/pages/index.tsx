import dynamic from "next/dynamic";

const DynamicTraw = dynamic(() => import("./TrawWrapper"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Web() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        display: "flex",
      }}
    >
      <DynamicTraw />
    </div>
  );
}
