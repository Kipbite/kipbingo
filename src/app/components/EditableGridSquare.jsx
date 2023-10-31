import { useContext } from "react";
import AdminContext from "../context";
import GridSquare from "./GridSquare";

export default function EditableGridSquare({ square }) {
  const { activeSquares, setActiveSquares, draggedSquare } = useContext(AdminContext);

  return (
    <div
      className='cell-wrapper'
      data-grid-ref={square.gridRef}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
        const newActiveSquares = { ...activeSquares };
        newActiveSquares[square.gridRef] = draggedSquare;
        console.log(newActiveSquares);
        setActiveSquares(newActiveSquares);
      }}
    >
      <div className="cell">
        {square?.text}
      </div>
    </div>
  );
}