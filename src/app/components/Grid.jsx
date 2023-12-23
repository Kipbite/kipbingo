import EditableGridSquare from "./EditableGridSquare";
import GridSquare from "./GridSquare";
import PlayableGridSquare from "./PlayableGridSquare";

export default function Grid({ squares, variant = 'viewer' }) {
  return (
    <div className="table">
      {Object.keys(squares).map((gridRef) => {
        switch (variant) {
          case 'play':
            return <PlayableGridSquare key={gridRef} square={{gridRef, ...squares[gridRef]}} />
            break;

          case 'edit':
            return <EditableGridSquare key={gridRef} square={{gridRef, ...squares[gridRef]}} />
            break;

          case 'viewer':
          default:
            return <GridSquare key={gridRef} square={{gridRef, ...squares[gridRef]}} />
            break;
        }
      })}
    </div>
  )
}
