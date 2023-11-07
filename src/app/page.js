"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, getUnfoldedSheet } from "./lib/utilities";
import Grid from "./components/Grid";
import GameHeader from "./components/GameHeader";

export default function HomePage({}) {
  const [ sheet, setSheet ] = useState({ squares: emptyGridRefs });

  useEffect(() => {
    (async () => {
      const gameType = 'yakuza';

      const tempSheet = await getUnfoldedSheet({ game: gameType });
      setSheet(tempSheet);
    })();
  }, []);

  if (!sheet?.squares) {
    return 'Failed to fetch squares';
  }

  return (
    <main>
      <GameHeader game={sheet.game} />
      <Grid squares={sheet.squares} />
      <h2 style={{textAlign: 'center'}}>{sheet.name}</h2>
    </main>
  )
}
