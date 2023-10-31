import EditableGridSquare from "./EditableGridSquare";
import GridSquare from "./GridSquare";

export default function Grid({ squares, variant = 'viewer' }) {
  return (
    <div className="table">
      {Object.keys(squares).map((gridRef) => {
        switch (variant) {
          case 'edit':
            return <EditableGridSquare key={gridRef} square={{gridRef, ...squares[gridRef]}} />
            break;
          case 'viewer':
          default:
            return <GridSquare key={gridRef} square={{gridRef, ...squares[gridRef]}} />
        }
      })}
    </div>
  )
}
