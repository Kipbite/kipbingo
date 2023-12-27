import { useContext } from "react";
import GridSquareText from "./GridSquareText";
import AdminContext from "../context";

export default function GridSquare({ square }) {
  const { goldenSquares } = useContext(AdminContext);
  const golden = goldenSquares.includes(square.gridRef);

  return (
    <div className={`cell ${square.ticked ? 'ticked' : ''} ${golden ? 'golden' : ''}`}>
      <GridSquareText text={square?.text} />
    </div>
  );
}
