import { useContext } from "react";
import AdminContext from "../context";
import Image from "next/image";
import Trashcan from "./Trashcan";

export default function EditableGridSquare({ square }) {
  const { activeSquares, setActiveSquares, draggedSquare, setDraggedSquare } = useContext(AdminContext);

  function updateSquare(e = null, newValue) {
    if (e) {
      e.preventDefault();
    }

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
      <div
        className="cell"
        onDrag={(e) => {
          e.preventDefault();
          const newSquare = { ...square };
          delete newSquare.gridRef;
          setDraggedSquare(newSquare);
        }}
        onDragEnd={(e) => {
          updateSquare(e, null);
        }}
        draggable
      >
        {square.text &&
          <div
            className="delete-button"
            onClick={ (e) => { updateSquare(e, null) } }
          >
            <Trashcan />
          </div>
        }
        {square?.text}
        <div className="grid-ref">
          {square.gridRef}
        </div>
      </div>
    </div>
  );
}