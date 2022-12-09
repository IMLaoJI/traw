import TrawWrapper from "./TrawWrapper";

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
      <TrawWrapper />
    </div>
  );
}
