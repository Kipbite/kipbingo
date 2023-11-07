"use client"

import { useEffect, useState } from "react";
import { sendApiRequest } from "../lib/utilities";
import SquarePicker from "./SquarePicker";

export default function SquarePickerList({ game }) {
  const [ squares, setSquares ] = useState();

  useEffect(() => {
    (async () => {
      const tempSquares = await sendApiRequest(
        'GET',
        '/squares',
        { game }
      );
      const optionList = [];
      tempSquares.forEach(square => {
        optionList.push(<SquarePicker key={square._id} square={square} />);
      });
      setSquares(optionList);
    })();
  }, [ game ]);

  return (
    <div className="possibilities">
      <h2>Options</h2>
      <ul>
        {squares || "Loading..."}
      </ul>
    </div>
  );
}
