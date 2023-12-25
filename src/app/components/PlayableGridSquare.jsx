import { useContext } from "react";
import AdminContext from "../context";
import { sendApiRequest } from "../lib/utilities";
import GridSquareText from "./GridSquareText";

export default function PlayableGridSquare({ square }) {
  const { squares, setSquares, sheet, goldenSquares } = useContext(AdminContext);

  let golden = goldenSquares.includes(square.gridRef);

  return (
    <div
      className={`cell playable ${square.ticked ? 'ticked' : ''} ${golden ? 'golden' : ''}`}
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
          // console.log(response);
        }
      }}
    >
      <GridSquareText text={square?.text} />
      <div className="grid-ref">
        {square.gridRef}
      </div>
    </div>
  );
}