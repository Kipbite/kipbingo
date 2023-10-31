import { useContext } from "react";
import AdminContext from "../context";

export default function SquarePicker({ square }) {
  const { setDraggedSquare } = useContext(AdminContext);

  return (
    <li
      className="possibility"
      onDrag={(e) => {
        e.preventDefault();
        setDraggedSquare(square);
      }}
      draggable
    >
      {square.text}
    </li>
  );
}