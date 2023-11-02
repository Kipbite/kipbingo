"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, getGame } from "../../lib/utilities";
import AdminContext from "../../context";
import GameHeader from "../../components/GameHeader";
import Grid from "../../components/Grid";
import SquarePickerList from "../../components/SquarePickerList";
import SaveButton from "@/app/components/SaveButton";
import NameInput from "@/app/components/NameInput";

export default function AdminPage({}) {
  const [ gameType, setGameType ] = useState('yakuza');
  const [ game, setGame ] = useState(null);
  const [ activeSquares, setActiveSquares ] = useState(emptyGridRefs);
  const [ draggedSquare, setDraggedSquare ] = useState(null);
  const [ sheetName, setSheetName ] = useState('');

  useEffect(() => {
    (async () => {
      const tempGame = await getGame(gameType);
      setGame(tempGame);
    })();
  }, [ gameType ]);

  if (!game) {
    return "Loading...";
  }

  return (
    <AdminContext.Provider value={{
      activeSquares, setActiveSquares,
      draggedSquare, setDraggedSquare,
      sheetName, setSheetName,
      gameType, setGameType,
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
        </div>
      </main>
    </AdminContext.Provider>
  )
}