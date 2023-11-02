import { useContext } from "react";
import AdminContext from "../context";

export default function PlayableGridSquare({ square }) {
  const { squares, setSquares, sheet } = useContext(AdminContext);

  return (
    <div
      className={`cell-wrapper playable ${square.ticked ? 'ticked' : ''}`}
      onClick={() => {
        if (squares[square.gridRef]) {
          const newSquares = { ...squares };
          newSquares[square.gridRef].ticked = !square.ticked;
          setSquares(newSquares);
          updateSheet({
            name: sheet.name,
            game: sheet.game.name,
            squares: newSquares
          });
        }
      }}
    >
      <div className="cell">
        {square?.text}
      </div>
    </div>
  );
}