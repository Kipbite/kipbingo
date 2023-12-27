"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, sendApiRequest, winChecker } from "./lib/utilities";
import Grid from "./components/Grid";
import GameHeader from "./components/GameHeader";
import SheetSwitcher from "./components/SheetSwitcher";
import AdminContext from "./context";

export default function HomePage({}) {
  const [ sheet, setSheet ] = useState({ squares: emptyGridRefs });
  const [ goldenSquares, setGoldenSquares ] = useState([]);

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

  useEffect(() => {
    winChecker( setGoldenSquares, sheet.squares );
  }, [ sheet.squares ]);
  
  if (!sheet?.squares) {
    return 'Failed to fetch squares';
  }

  return (
    <AdminContext.Provider value={{
      isAdmin: false,
      setSheet,
      goldenSquares
    }}>
      <main>
        <GameHeader game={sheet.game} />
        <Grid squares={sheet.squares} />
        <SheetSwitcher sheet={sheet} />
      </main>
    </AdminContext.Provider>
  )
}
