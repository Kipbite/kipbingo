import { useContext } from "react";
import AdminContext from "../context";

export default function GridSquare({ square }) {
  return (
    <div className='cell-wrapper'>
      <div className="cell">
        {square?.text}
      </div>
    </div>
  );
}