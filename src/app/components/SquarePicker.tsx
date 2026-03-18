import { useContext } from "react";
import AdminContext, { NewContext } from "../context";
import Trashcan from "./Trashcan";
import { sendApiRequest } from "../lib/utilities";
import { Square } from "../types";

interface Props {
  square: Square
}

export default function SquarePicker( { square }: Props ) {
  const { setDraggedSquare, updateSquares, setUpdateSquares } = useContext<NewContext>( AdminContext );

  return (
    <div className="possibility-wrapper">
      <li
        className="possibility"
        onDrag={ e => {
          e.preventDefault();
          setDraggedSquare( square );
        } }
        draggable
      >
        <span>{ square.text }</span>
      </li>
      <span className="delete-possibility" onClick={ async () => {
        // TODO: Handle response properly
        const response = await sendApiRequest(
          'PATCH',
          '/squares',
          null,
          { id: square._id, active: false }
        );

        setUpdateSquares( updateSquares + 1 );
      } }>
        <Trashcan />
      </span>
    </div>
  );
}