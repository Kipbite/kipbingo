"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, sendApiRequest } from "../../lib/utilities";
import AdminContext from "../../context";
import GameHeader from "../../components/GameHeader";
import Grid from "../../components/Grid";
import SquarePickerList from "../../components/SquarePickerList";
import SaveButton from "@/app/components/SaveButton";
import NameInput from "@/app/components/NameInput";
import GamePicker from "@/app/components/GamePicker";
import SquarePicker from "@/app/components/SquarePicker";
import RandomiseButton from "@/app/components/RandomiseButton";

export default function AdminPage({}) {
  const [ gameType, setGameType ] = useState('yakuza');
  const [ game, setGame ] = useState(null);
  const [ squares, setSquares ] = useState();
  const [ activeSquares, setActiveSquares ] = useState(emptyGridRefs);
  const [ draggedSquare, setDraggedSquare ] = useState(null);
  const [ sheetName, setSheetName ] = useState('');
  const [ updateSquares, setUpdateSquares ] = useState(0);

  useEffect(() => {
    (async () => {
      const tempGame = await sendApiRequest(
        'GET',
        '/games',
        { game: gameType }
      );
      setGame(tempGame);
    })();
  }, [ gameType ]);

  useEffect(() => {
    (async () => {
      const tempSquares = await sendApiRequest(
        'GET',
        '/squares',
        { game: game?.name }
      );
      const optionList = [];
      tempSquares.forEach(square => {
        optionList.push(<SquarePicker key={square._id} square={square} />);
      });
      setSquares(optionList);
    })();
  }, [ game, updateSquares ]);

  if (!game) {
    return "Loading...";
  }

  return (
    <AdminContext.Provider value={{
      squares, setSquares,
      activeSquares, setActiveSquares,
      draggedSquare, setDraggedSquare,
      sheetName, setSheetName,
      gameType, setGameType,
      updateSquares, setUpdateSquares,
    }}>
      <main className="container">
        <div>
          <GameHeader game={game} />
          <Grid squares={activeSquares} variant="edit" />
          <div className="save-form">
            <NameInput />
            <SaveButton />
          </div>
        </div>
        
        <div>
          <SquarePickerList game={gameType} />
          <GamePicker />
          <RandomiseButton />
        </div>
      </main>
    </AdminContext.Provider>
  )
}