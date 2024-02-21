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
    const refreshTime = 1000 * 60 // 1 min

    const refreshData = async function() {
      const response = await sendApiRequest(
        'GET',
        '/sheets/unfolded'
      );

      if (!response.success) {
        console.error('Error fetching unfolded sheets: ', response.message);
        return;
      }

      setSheet(response.message);

      setTimeout(() => {
        refreshData();
      }, refreshTime);
    }

    refreshData();
  }, []);

  useEffect(() => {
    if (sheet?.squares) {
      winChecker( setGoldenSquares, sheet.squares );
    }
  }, [ sheet ]);
  
  if (!sheet?.squares) {
    return <main className="container">Loading...</main>;
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
