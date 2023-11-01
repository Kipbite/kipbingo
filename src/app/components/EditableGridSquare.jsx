import { useContext } from "react";
import AdminContext from "../context";
import Image from "next/image";
import Trashcan from "./Trashcan";

export default function EditableGridSquare({ square }) {
  const { activeSquares, setActiveSquares, draggedSquare } = useContext(AdminContext);

  function updateSquare(e, newValue) {
    e.preventDefault();

    const newActiveSquares = { ...activeSquares };
    newActiveSquares[square.gridRef] = newValue;
    setActiveSquares(newActiveSquares);
  }

  return (
    <div
      className='cell-wrapper'
      data-grid-ref={square.gridRef}
      onDragOver={ (e) => { e.preventDefault() } }
      onDrop={ (e) => { updateSquare(e, draggedSquare) } }
    >
      <div className="cell">
        {square.text &&
          <div
            className="delete-button"
            onClick={ (e) => { updateSquare(e, null) } }
          >
            <Trashcan />
          </div>
        }
        {square?.text}
      </div>
    </div>
  );
}