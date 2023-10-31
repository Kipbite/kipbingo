"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, getGame } from "../../lib/utilities";
import GameHeader from "../../components/GameHeader";
import Grid from "../../components/Grid";
import SquarePickerList from "../../components/SquarePickerList";
import AdminContext from "../../context";
import SaveAsButton from "@/app/components/SaveAsButton";

export default function AdminPage({}) {
  const [ gameType, setGameType ] = useState('yakuza');
  const [ game, setGame ] = useState(null);
  const [ activeSquares, setActiveSquares ] = useState(emptyGridRefs);
  const [ draggedSquare, setDraggedSquare ] = useState(null);
  const [ sheetName, setSheetName ] = useState('test-name');

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
      game, setGame,
    }}>
      <main className="container">
        <div>
          <GameHeader game={game} />
          <Grid squares={activeSquares} variant="edit" />
          <SaveAsButton />
        </div>
        
        <div>
          <SquarePickerList game={game} />
        </div>
      </main>
    </AdminContext.Provider>
  )
}