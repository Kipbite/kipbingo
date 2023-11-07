export default function GridSquare({ square }) {
  return (
    <div className={`cell-wrapper ${square.ticked ? 'ticked' : ''}`}>
      <div className="cell">
        {square?.text}
      </div>
    </div>
  );
}