import { useContext, useState } from "react";
import AdminContext from "../context";
import { sendApiRequest } from "../lib/utilities";

export default function NewSquarePicker({}) {
  const { updateSquares, setUpdateSquares, gameType } = useContext(AdminContext);
  const [ newSquare, setNewSquare ] = useState('');

  return (
    <div className="possibility new-possibility">
      <input
        type="text"
        placeholder="New square"
        onChange={(e) => {
          setNewSquare(e.target.value);
        }}
        value={newSquare}
      />
      <button onClick={async () => {
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
      }}>
        Add
      </button>
    </div>
  );
}