"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, getGame, getSheet, getGrid } from "../../lib/utilities";
import AdminContext from "../../context";
import Grid from "../../components/Grid";
import GameHeader from "../../components/GameHeader";

export default function PlayPage({}) {
  const [ gameType, setGameType ] = useState('yakuza');
  const [ game, setGame ] = useState(null);
  const [ sheet, setSheet ] = useState(null);
  const [ squares, setSquares ] = useState(emptyGridRefs);
  const [ draggedSquare, setDraggedSquare ] = useState(null);
  const [ sheetName, setSheetName ] = useState('');

  useEffect(() => {
    (async () => {
      const tempSquares = await getGrid({ game: gameType });
      setSquares(tempSquares);

      const tempSheet = await getSheet({ game: gameType });
      setSheet(tempSheet);

      const tempGame = await getGame(gameType);
      setGame(tempGame);
    })();
  }, [ gameType ]);

  if (!squares) {
    return 'Failed to fetch squares, check console for errors';
  }

  return (
    <AdminContext.Provider value={{
      squares, setSquares,
      draggedSquare, setDraggedSquare,
      sheetName, setSheetName,
      game, setGame,
    }}>
      <main>
        <GameHeader game={game} />
        <Grid squares={squares} variant="play" />
      </main>
    </AdminContext.Provider>
  )
}
