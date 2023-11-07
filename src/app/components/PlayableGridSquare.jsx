import { useContext } from "react";
import AdminContext from "../context";
import { sendApiRequest } from "../lib/utilities";

export default function PlayableGridSquare({ square }) {
  const { squares, setSquares, sheet } = useContext(AdminContext);

  return (
    <div
      className={`cell-wrapper playable ${square.ticked ? 'ticked' : ''}`}
      onClick={async () => {
        if (squares[square.gridRef]) {
          const newSheetSquares = {};
          Object.keys(squares).forEach((key) => {
            newSheetSquares[key] = {
              id: squares[key]?._id,
              ticked: squares[key]?.ticked,
            }
          });

          newSheetSquares[square.gridRef].ticked = !square.ticked;

          const newSquares = { ...squares };
          newSquares[square.gridRef].ticked = !square.ticked;

          setSquares( newSquares );

          const response = await sendApiRequest(
            'PATCH',
            '/sheets',
            null,
            {
              id: sheet._id,
              squares: newSheetSquares
            }
          );
          
          // TODO: Handle response properly
          console.log(response);
        }
      }}
    >
      <div className="cell">
        {square?.text}
      </div>
    </div>
  );
}