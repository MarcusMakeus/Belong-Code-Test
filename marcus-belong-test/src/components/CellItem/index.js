import { React } from "react";

const CellItem = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={
        props.isCellAlive
          ? "border bg-green-600 border-green-600 w-5 h-5"
          : "border border-green-600  w-5 h-5"
      }
    />
  );
};
export default CellItem;
