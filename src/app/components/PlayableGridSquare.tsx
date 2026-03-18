import { useContext } from "react";
import GridSquareText from "./GridSquareText";
import AdminContext, { PlayContext } from "../context";
import { fireMixitupWebhook, sendApiRequest } from "../lib/utilities";
import { GridRef, Square } from "../types";

interface Props {
  square?: Square
}

export default function PlayableGridSquare( { square }: Props ) {
  const { squares, setSquares, sheet, goldenSquares } = useContext<PlayContext>( AdminContext );
  const isGold = goldenSquares.includes( square.gridRef ?? null );

  return (
    <div
      className={ `cell playable ${ square.ticked ? 'ticked' : '' } ${ isGold ? 'golden' : ''}`}
      onClick={ async () => {
        if ( squares[ square.gridRef ] ) {
          const newSheetSquares = {};
          Object.keys( squares ).forEach( ( key: GridRef ) =>
            newSheetSquares[ key ] = {
              id: squares[ key ]?._id,
              ticked: squares[ key ]?.ticked,
            }
          );

          newSheetSquares[ square.gridRef ].ticked = ! square.ticked;

          if ( ! square.ticked ) {
            const mixitupData = {
              square: square.text,
              event: 'mark'
            }
            fireMixitupWebhook( mixitupData );
          }

          const newSquares = { ...squares };
          newSquares[ square.gridRef ].ticked = ! square.ticked;

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
      } }
    >
      <GridSquareText text={ square?.text } />
      <div className="grid-ref">
        { square.gridRef }
      </div>
    </div>
  );
}