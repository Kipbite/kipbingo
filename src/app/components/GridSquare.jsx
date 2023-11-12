import GridSquareText from "./GridSquareText";

export default function GridSquare({ square }) {
  return (
    <div className={`cell-wrapper ${square.ticked ? 'ticked' : ''}`}>
      <div className="cell">
        <GridSquareText text={square?.text} />
      </div>
    </div>
  );
}