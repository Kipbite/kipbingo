import { useContext } from "react";
import AdminContext, { NewContext } from "../context";
import { emptyGridRefs } from "../lib/utilities";
import { Grid, GridRef, Square } from "../types";

export default function RandomiseButton() {
  const { squares, setActiveSquares } = useContext<NewContext>( AdminContext );

  function handleRandomise() {
    const usableSquares = [ ...squares ];
    const newSquares: Grid = { ...emptyGridRefs };
    
    Object.keys( emptyGridRefs ).forEach( ( gridRef: GridRef ) => {
      if ( gridRef === 'C2' ) {
        const newSquare: Square = {
          gridRef: 'C2',
          _id: '6550ed5c40169af275977fdb',
          text: "free-space",
          game: 'any',
          active: true,
          ticked: false,
        };

        newSquares[ gridRef ] = newSquare;
      } else if ( usableSquares.length > 0 ) {
        const rand = Math.floor(
          Math.random() * usableSquares.length
        );

        newSquares[ gridRef ] = {
          gridRef,
          ticked: false,
          ...usableSquares[ rand ].props.square
        }

        usableSquares.splice( rand, 1 );
      }
    } );

    setActiveSquares( newSquares );
  }

  return (
    <button className="randomise" onClick={ handleRandomise }>
      Randomise
    </button>
  );
}