import { useContext } from "react";
import AdminContext from "../context";
import Trashcan from "./Trashcan";
import { sendApiRequest } from "../lib/utilities";

export default function SquarePicker({ square }) {
  const { setDraggedSquare, updateSquares, setUpdateSquares } = useContext(AdminContext);

  return (
    <li
      className="possibility"
      onDrag={(e) => {
        e.preventDefault();
        setDraggedSquare(square);
      }}
      draggable
    >
      <span>{square.text}</span>
      <span className="delete-possibility" onClick={async () => {
        // TODO: Handle response properly
        const response = await sendApiRequest(
          'DELETE',
          '/squares',
          { 'id': square._id }
        );

        setUpdateSquares(updateSquares + 1);
      }}>
        <Trashcan />
      </span>
    </li>
  );
}