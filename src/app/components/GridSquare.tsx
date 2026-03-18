import { useContext } from "react";
import GridSquareText from "./GridSquareText";
import AdminContext, { PlayContext } from "../context";
import { Square } from "../types";

interface Props {
  square: Square
}

export default function GridSquare( { square }: Props ) {
  const { goldenSquares } = useContext<PlayContext>( AdminContext );
  const isGold = goldenSquares.includes( square.gridRef );

  return (
    <div className={ `cell ${ square.ticked ? 'ticked' : '' } ${ isGold ? 'golden' : '' }` }>
      <GridSquareText text={ square?.text } />
    </div>
  );
}
