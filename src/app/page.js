"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, getGame, getSheetSquares } from "./lib/utilities";
import Grid from "./components/Grid";
import GameHeader from "./components/GameHeader";

export default function Home({}) {
  const [ gameType, setGameType ] = useState('yakuza');
  const [ game, setGame ] = useState(null);
  const [ squares, setSquares ] = useState(emptyGridRefs);

  useEffect(() => {
    (async () => {
      const tempSquares = await getSheetSquares({ game: gameType });
      setSquares(tempSquares);

      const tempGame = await getGame(gameType);
      setGame(tempGame);
    })();
  }, [
    gameType
  ]);

  if (!squares) {
    return 'Failed to fetch squares, check console for errors';
  }

  return (
    <main>
      <GameHeader game={game} />
      <Grid squares={squares} />
    </main>
  )
}
