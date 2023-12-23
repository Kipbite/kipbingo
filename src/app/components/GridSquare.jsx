import GridSquareText from "./GridSquareText";

export default function GridSquare({ square }) {
  return (
    <div className={`cell ${square.ticked ? 'ticked' : ''}`}>
      <GridSquareText text={square?.text} />
    </div>
  );
}