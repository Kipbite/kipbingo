import { nextLetter } from "../lib/utilities";
import GridSquare from "./GridSquare";

export default function Grid({ squares }) {
  return (
    <div className="table">
      {Object.keys(squares).map((gridRef) => {
        return <GridSquare key={gridRef} square={{ref: gridRef, ...squares[gridRef]}} />;
      })}
    </div>
  )
}
