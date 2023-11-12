import { useContext } from "react";
import AdminContext from "../context";

export default function SquarePickerList({ game }) {
  const { squares } = useContext(AdminContext);

  return (
    <div className="possibilities">
      <h2>Options</h2>
      <ul>
        {squares || "Loading..."}
      </ul>
    </div>
  );
}
