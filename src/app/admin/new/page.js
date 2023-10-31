"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, getGame } from "../../lib/utilities";
import GameHeader from "../../components/GameHeader";
import Grid from "../../components/Grid";
import SquarePickerList from "../../components/SquarePickerList";
import AdminContext from "../../context";

export default function AdminPage({}) {
  const [ gameType, setGameType ] = useState('yakuza');
  const [ game, setGame ] = useState(null);
  const [ activeSquares, setActiveSquares ] = useState(emptyGridRefs);
  const [ draggedSquare, setDraggedSquare ] = useState(null);

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
      draggedSquare, setDraggedSquare
    }}>
      <main className="container">
        <div>
          <GameHeader game={game} />
          <Grid squares={activeSquares} variant="edit" />
        </div>
        <div>
          <SquarePickerList game={game} />
        </div>
      </main>
    </AdminContext.Provider>
  )
}