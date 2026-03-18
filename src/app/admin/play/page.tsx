"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, sendApiRequest, winChecker } from "../../lib/utilities";
import AdminContext, { PlayContext } from "../../context";
import Grid from "../../components/Grid";
import GameHeader from "../../components/GameHeader";
import SheetSwitcher from "@/app/components/SheetSwitcher";
import { useSearchParams } from "next/navigation";
import { GridRef, Sheet, Square } from "@/app/types";

export default function PlayPage() {
  const searchParams = useSearchParams();
  const sheetId = searchParams.get( 'sheetId' ) ?? null;

  const [ sheet, setSheet ] = useState<Sheet>();
  const [ squares, setSquares ] = useState( emptyGridRefs );
  const [ draggedSquare, setDraggedSquare ] = useState<Square>( null );
  const [ goldenSquares, setGoldenSquares ] = useState<GridRef[]>( [] );

  useEffect( () => {
    ( async () => {
      const response = await sendApiRequest<Sheet>(
        'GET',
        '/sheets/unfolded',
        sheetId ? { sheetId } : { game: 'yakuza' },
      );

      if ( ! response.success ) {
        console.error( `Error fetching unfolded sheets: ${ response.message }` );
        return;
      }

      setSheet( response.message );
    } )();
  }, [ sheetId ] );

  useEffect( () => {
    const newSquares = sheet?.squares ?? emptyGridRefs;
    setSquares( newSquares );
  }, [ sheet ] );

  useEffect( () => {
    winChecker( setGoldenSquares, squares );
  }, [ squares ] );

  if ( ! squares ) {
    return 'Failed to fetch squares, check console for errors';
  }

  const contextOptions: PlayContext = {
    isAdmin: true,
    sheet, setSheet,
    squares, setSquares,
    draggedSquare, setDraggedSquare,
    goldenSquares,
  };

  console.log( 'sheet: ', sheet );

  return (
    <AdminContext.Provider value={ contextOptions }>
      <main>
        <GameHeader game={ sheet?.game } />
        <Grid squares={ squares } variant='play' />
        { sheet && <SheetSwitcher sheet={ sheet } /> }
      </main>
    </AdminContext.Provider>
  )
}
