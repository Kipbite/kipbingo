import { use } from "react";
import Grid from "./components/Grid";
import { getGame, getSquares } from "./lib/utilities";
import GameHeader from "./components/GameHeader";

export default function Home({}) {
  const squares = use(getSquares());
  const game = use(getGame('yakuza'));

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
