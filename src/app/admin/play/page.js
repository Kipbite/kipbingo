"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, sendApiRequest } from "../../lib/utilities";
import AdminContext from "../../context";
import Grid from "../../components/Grid";
import GameHeader from "../../components/GameHeader";
import SheetSwitcher from "@/app/components/SheetSwitcher";

export default function PlayPage({}) {
  const [ sheet, setSheet ] = useState();
  const [ squares, setSquares ] = useState(emptyGridRefs);
  const [ draggedSquare, setDraggedSquare ] = useState(null);

  useEffect(() => {
    (async () => {
      const gameType = 'yakuza';
      const tempSheet = await sendApiRequest(
        'GET',
        '/sheets/unfolded',
        { game: gameType },
      );
      setSheet(tempSheet);
    })();
  }, []);

  useEffect(() => {
    const newSquares = sheet?.squares ?? emptyGridRefs;
    setSquares(newSquares);
  }, [ sheet ]);

  if (!squares) {
    return 'Failed to fetch squares, check console for errors';
  }

  return (
    <AdminContext.Provider value={{
      sheet, setSheet,
      squares, setSquares,
      draggedSquare, setDraggedSquare,
    }}>
      <main>
        <GameHeader game={sheet?.game} />
        <Grid squares={squares} variant="play" />
        {sheet && <SheetSwitcher sheet={sheet} />}
      </main>
    </AdminContext.Provider>
  )
}
