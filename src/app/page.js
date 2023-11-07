"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, sendApiRequest } from "./lib/utilities";
import Grid from "./components/Grid";
import GameHeader from "./components/GameHeader";

export default function HomePage({}) {
  const [ sheet, setSheet ] = useState({ squares: emptyGridRefs });

  useEffect(() => {
    const refreshTime = 1000 * 60 * 10 // 10 mins

    const refreshData = async function() {
      const gameType = 'yakuza';
      const tempSheet = await sendApiRequest(
        'GET',
        '/sheets/unfolded',
        { game: gameType },
        null
      );
      setSheet(tempSheet);

      setTimeout(() => {
        refreshData();
      }, refreshTime);
    }

    refreshData();
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
