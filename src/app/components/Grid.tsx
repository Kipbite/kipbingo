import { Grid as GridType, GridRef, Square } from "../types";
import EditableGridSquare from "./EditableGridSquare";
import GridSquare from "./GridSquare";
import PlayableGridSquare from "./PlayableGridSquare";

interface Props {
  squares: GridType
  variant?: 'play' | 'edit' | 'viewer'
}

export default function Grid( {
  squares,
  variant = 'viewer'
}: Props ) {
  return (
    <div className="table">
      { Object.keys( squares ).map(
        ( gridRef: GridRef ) => {
          if ( ! squares[ gridRef ] ) {
            console.error( `Nothing found at ${ gridRef }` );
            return;
          }

          const square: Square = squares[ gridRef ].gridRef ? squares[ gridRef ] : {
            gridRef, ...squares[ gridRef ]
          };

          switch ( variant ) {
            case 'play':
              return (
                <PlayableGridSquare
                  key={ gridRef }
                  square={ square }
                />
              );

            case 'edit':
              return (
                <EditableGridSquare
                  key={ gridRef }
                  square={ square }
                />
              );

            case 'viewer':
            default:
              return (
                <GridSquare
                  key={ gridRef }
                  square={ square }
                />
              );
          }
        }
      ) }
    </div>
  )
}
