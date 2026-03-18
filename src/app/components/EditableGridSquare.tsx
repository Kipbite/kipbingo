import { useContext } from "react";
import AdminContext, { NewContext } from "../context";
import Trashcan from "./Trashcan";
import GridSquareText from "./GridSquareText";
import { Square } from "../types";

interface Props {
  square: Square
}

export default function EditableGridSquare( { square }: Props ) {
  const { activeSquares, setActiveSquares, draggedSquare, setDraggedSquare } = useContext<NewContext>( AdminContext );

  function updateSquare(
    e: { preventDefault: () => void } = null,
    newValue: Square
  ) {
    if ( e ) {
      e.preventDefault();
    }

    const newActiveSquares = { ...activeSquares };
    newActiveSquares[ square.gridRef ] = newValue ? {
      gridRef: square.gridRef,
      ticked: false,
      ...newValue
    } : null;

    setActiveSquares( newActiveSquares );
  }

  return (
    <div
      className='cell editable'
      data-grid-ref={square.gridRef}
      onDragOver={ e => e.preventDefault() }
      onDrop={ e => updateSquare( e, draggedSquare ) }
      onDrag={ e => {
        e.preventDefault();
        const newSquare = { ...square };
        delete newSquare.gridRef;
        setDraggedSquare( newSquare );
      } }
      onDragEnd={ e => updateSquare( e, null ) }
      draggable
    >
      { square.text &&
        <div
          className="delete-button"
          onClick={ e => updateSquare( e, null ) }
        >
          <Trashcan />
        </div>
      }
      <GridSquareText text={ square?.text } />
      <div className="grid-ref">
        { square.gridRef }
      </div>
    </div>
  );
}