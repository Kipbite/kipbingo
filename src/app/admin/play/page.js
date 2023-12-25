"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, sendApiRequest } from "../../lib/utilities";
import AdminContext from "../../context";
import Grid from "../../components/Grid";
import GameHeader from "../../components/GameHeader";
import SheetSwitcher from "@/app/components/SheetSwitcher";
import { useSearchParams } from "next/navigation";

export default function PlayPage({}) {
  const searchParams = useSearchParams();
  const sheetId = searchParams.get('sheetId') ?? null;
  const [ sheet, setSheet ] = useState();
  const [ squares, setSquares ] = useState(emptyGridRefs);
  const [ draggedSquare, setDraggedSquare ] = useState(null);
  const [ goldenSquares, setGoldenSquares ] = useState([]);

  useEffect(() => {
    (async () => {
      let tempSheet;

      if (sheetId) {
        tempSheet = await sendApiRequest(
          'GET',
          '/sheets/unfolded',
          { sheetId },
        );
      } else {
        tempSheet = await sendApiRequest(
          'GET',
          '/sheets/unfolded',
          { game: 'yakuza' },
        );
      }
      setSheet(tempSheet);
    })();
  }, [ sheetId ]);

  useEffect(() => {
    const newSquares = sheet?.squares ?? emptyGridRefs;
    setSquares(newSquares);
  }, [ sheet ]);

  // Check for if bingo has been achieved
  useEffect(() => {
    let tempGoldenSquares = [];

    function checkForBingo( gridRefs ) {
      let bingo = true;
      for (const gridRef of gridRefs) {
        if (!squares[gridRef]?.ticked) {
          bingo = false;
        }
      }

      return bingo;
    }

    let rows = {
      'A': false, 'B': false, 'C': false, 'D': false, 'E': false
    };
  
    let columns = {
      0: false, 1: false, 2: false, 3: false, 4: false
    };

    let tempWins = {
      ...rows,
      ...columns
    };

    for (let row in rows) {
      let gridRefs = [];
      for (let column in columns) {
        gridRefs.push(`${row}${column}`);
      }

      if (checkForBingo(gridRefs)) {
        gridRefs.forEach((gridRef) => {
          tempGoldenSquares.push(gridRef);
        })
      }
    }

    for (let column in columns) {
      let gridRefs = [];
      for (let row in rows) {
        gridRefs.push(`${row}${column}`);
      }

      if (checkForBingo(gridRefs)) {
        gridRefs.forEach((gridRef) => {
          tempGoldenSquares.push(gridRef);
        })
      }
    }

    setGoldenSquares([ ...tempGoldenSquares ]);
  }, [ squares ])

  if (!squares) {
    return 'Failed to fetch squares, check console for errors';
  }

  return (
    <AdminContext.Provider value={{
      isAdmin: true,
      sheet, setSheet,
      squares, setSquares,
      draggedSquare, setDraggedSquare,
      goldenSquares,
    }}>
      <main>
        <GameHeader game={sheet?.game} />
        <Grid squares={squares} variant="play" />
        {sheet && <SheetSwitcher sheet={sheet} />}
      </main>
    </AdminContext.Provider>
  )
}
