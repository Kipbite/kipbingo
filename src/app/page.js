"use client"

import { use, useEffect, useState } from "react";
import Grid from "./components/Grid";
import { emptyGridRefs, getGame, getSquares } from "./lib/utilities";
import GameHeader from "./components/GameHeader";

export default function Home({}) {
  const [ gameType, setGameType ] = useState('horror');
  const [ game, setGame ] = useState(null);
  const [ squares, setSquares ] = useState(emptyGridRefs);

  useEffect(() => {
    (async () => {
      const tempSquares = await getSquares({ game: gameType });
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

  if (game === null) {
    return "Loading...";
  }

  return (
    <main>
      <GameHeader game={game} />
      <Grid squares={squares} />
    </main>
  )
}
