import { useContext } from "react";
import AdminContext, { NewContext } from "../context";
import { emptyGridRefs } from "../lib/utilities";
import { Grid, GridRef, LightweightSquare, Square } from "../types";

export default function RandomiseButton() {
  const { squares, setActiveSquares } = useContext<NewContext>( AdminContext );

  function handleRandomise() {
    const usableSquares = [ ...squares ];
    const newSquares: Record<GridRef, Square|LightweightSquare> = { ...emptyGridRefs };
    
    Object.keys( emptyGridRefs ).forEach( ( key: GridRef ) => {
      if ( key === 'C2' ) {
        const newSquare: Square = {
          _id: '6550ed5c40169af275977fdb',
          text: "free-space",
          game: 'any',
          active: true,
          ticked: false,
        };

        newSquares[ key ] = newSquare;
      } else if ( usableSquares.length > 0 ) {
        const rand = Math.floor(
          Math.random() * usableSquares.length
        );
    
        newSquares[ key ] = {
          ticked: false,
          ...usableSquares[ rand ].props.square
        }

        usableSquares.splice( rand, 1 );
      }
    } );

    setActiveSquares( newSquares as Grid );
  }

  return (
    <button className="randomise" onClick={ handleRandomise }>
      Randomise
    </button>
  );
}