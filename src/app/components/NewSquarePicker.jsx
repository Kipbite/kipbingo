import { useContext, useState } from "react";
import AdminContext from "../context";
import { sendApiRequest } from "../lib/utilities";

export default function NewSquarePicker({}) {
  const { updateSquares, setUpdateSquares, gameType } = useContext(AdminContext);
  const [ newSquare, setNewSquare ] = useState('');

  async function submitNewSquare() {
    await sendApiRequest(
      'POST',
      '/squares',
      null,
      {
        game: gameType,
        text: newSquare,
      }
    );
    
    setNewSquare('');
    setUpdateSquares(updateSquares + 1);
    document.querySelector('.new-possibility-input').focus();
  }

  return (
    <div className="possibility new-possibility">
      <input
        className="new-possibility-input"
        type="text"
        placeholder="New square"
        onChange={(e) => {
          setNewSquare(e.target.value);
        }}
        onKeyUp={(e) => {
          let isEnter = false;

          if ( e.key !== undefined ) {
            isEnter = e.key === "Enter";
          } else if ( e.keyCode !== undefined ) {
            isEnter = e.keyCode === 13;
          }

          if ( isEnter ) {
            submitNewSquare()
          }
        }}
        value={newSquare}
      />

      <button onClick={() => {
        submitNewSquare()
      }}>
        Add
      </button>
    </div>
  );
}