import { useContext } from "react";
import AdminContext from "../context";

export default function PlayableGridSquare({ square }) {
  const { squares, setSquares, sheetName, game } = useContext(AdminContext);

  return (
    <div
      className={`cell-wrapper playable ${square.ticked ? 'ticked' : ''}`}
      onClick={() => {
        if (squares[square.gridRef]) {
          const newSquares = { ...squares };
          newSquares[square.gridRef].ticked = !square.ticked;
          setSquares(newSquares);
          updateSheet({ sheetName, game, squares: newSquares });
        }
      }}
    >
      <div className="cell">
        {square?.text}
      </div>
    </div>
  );
}