import { GridRef, Grid as GridType } from "../types";
import EditableGridSquare from "./EditableGridSquare";
import GridSquare from "./GridSquare";
import PlayableGridSquare from "./PlayableGridSquare";

interface Props {
  squares: GridType
  variant: 'play' | 'edit' | 'viewer'
}

export default function Grid( {
  squares,
  variant = 'viewer'
}: Props ) {
  return (
    <div className="table">
      { Object.keys( squares ).map(
        ( gridRef: GridRef ) => {
          switch ( variant ) {
            case 'play':
              return (
                <PlayableGridSquare
                  key={ gridRef }
                  square={ { gridRef, ...squares[ gridRef ] } }
                />
              );

            case 'edit':
              return (
                <EditableGridSquare
                  key={ gridRef }
                  square={ { gridRef, ...squares[ gridRef ] } }
                />
              );

            case 'viewer':
            default:
              return (
                <GridSquare
                  key={ gridRef }
                  square={ { gridRef, ...squares[ gridRef ] } }
                />
              );
          }
        }
      ) }
    </div>
  )
}
