import { useContext } from "react";
import AdminContext from "../context";
import { emptyGridRefs } from "../lib/utilities";

export default function RandomiseButton({}) {
  const { squares, setActiveSquares } = useContext(AdminContext);

  function handleRandomise() {
    const usableSquares = [ ...squares ];
    const newSquares = { ...emptyGridRefs };
    
    Object.keys(emptyGridRefs).forEach((key) => {
      if (key === 'C2') {
        newSquares[key] = {
          ticked: false,
          _id: '6550ed5c40169af275977fdb',
          text: "free-space",
          game: 'any',
        }
      } else if (usableSquares.length > 0) {
        const rand = Math.floor(Math.random() * usableSquares.length);
    
        newSquares[key] = {
          ticked: false,
          ...usableSquares[rand].props.square
        }

        usableSquares.splice(rand, 1);
      }
    });
  
    console.log(newSquares);
    setActiveSquares(newSquares);
  }

  return (
    <button className="randomise" onClick={handleRandomise}>
      Randomise
    </button>
  );
}