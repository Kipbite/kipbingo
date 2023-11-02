import { useContext } from "react";
import AdminContext from "../context";
import { updateSheet } from "../lib/utilities";

export default function PlayableGridSquare({ square }) {
  const { squares, setSquares } = useContext(AdminContext);

  return (
    <div
      className={`cell-wrapper playable ${square.ticked ? 'ticked' : ''}`}
      onClick={async () => {
        if (squares[square.gridRef]) {
          const response = await updateSquare({
            id: square._id,
            ticked: !square.ticked
          });
          console.log(response);
          return;

          const newSquares = { ...squares };
          newSquares[square.gridRef].ticked = !square.ticked;
          setSquares(newSquares);
        }
      }}
    >
      <div className="cell">
        {square?.text}
      </div>
    </div>
  );
}