"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, getGame, getSheet, getUnfoldedSheet } from "../../lib/utilities";
import AdminContext from "../../context";
import Grid from "../../components/Grid";
import GameHeader from "../../components/GameHeader";

export default function PlayPage({}) {
  const [ sheet, setSheet ] = useState({ squares: emptyGridRefs });
  const [ squares, setSquares ] = useState(emptyGridRefs);
  const [ draggedSquare, setDraggedSquare ] = useState(null);

  useEffect(() => {
    (async () => {
      const gameType = 'yakuza';

      const tempSheet = await getUnfoldedSheet({ game: gameType });
      setSheet(tempSheet);
      setSquares(tempSheet.squares);
    })();
  }, []);

  if (!squares) {
    return 'Failed to fetch squares, check console for errors';
  }

  return (
    <AdminContext.Provider value={{
      squares, setSquares,
      draggedSquare, setDraggedSquare,
    }}>
      <main>
        <GameHeader game={sheet?.game} />
        <Grid squares={squares} variant="play" />
        <h2 style={{textAlign: 'center'}}>{sheet?.name}</h2>
      </main>
    </AdminContext.Provider>
  )
}
