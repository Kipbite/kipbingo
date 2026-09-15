"use client"

import { useEffect, useState } from "react";
import { sendApiRequest, winChecker } from "./lib/utilities";
import Grid from "./components/Grid";
import GameHeader from "./components/GameHeader";
import SheetSwitcher from "./components/SheetSwitcher";
import AdminContext, { HomepageContext } from "./context";
import { GridRef, Sheet } from "./types";
import useSupabase from "./hooks/useSupabase";

export default function HomePage() {
  const [ sheet, setSheet ] = useState<Sheet>();
  const [ goldenSquares, setGoldenSquares ] = useState<GridRef[]>( [] );
  const [ channel ] = useSupabase('bingo');

  useEffect( () => {
    if ( !channel ) {
      return;
    }

    channel.on(
      'broadcast',
      { event: 'update' },
      ( { payload } ) => setSheet( payload )
    ).subscribe();
  }, [ sheet, channel ] );

  useEffect( () => {
    (async () => {
      const response = await sendApiRequest<Sheet>(
        'GET',
        '/sheets/unfolded'
      );
    
      if ( ! response ) {
        console.error( 'Error fetching unfolded sheets: No response from /sheets/unfolded API endpoint' );
        return;
      }
    
      if ( ! response.success ) {
        console.error( `Error fetching unfolded sheets: ${ response.message }` );
        return;
      }
    
      setSheet( response.message );
    })();
  }, [] );

  useEffect( () => {
    if ( sheet?.squares ) {
      winChecker( setGoldenSquares, sheet.squares );
    }
  }, [ sheet ] );
  
  if ( ! sheet?.squares ) {
    return <main className="container">Loading...</main>;
  }

  const contextOptions: HomepageContext = {
    isAdmin: false,
    setSheet,
    goldenSquares
  }

  return (
    <AdminContext.Provider value={ contextOptions }>
      <main>
        <GameHeader game={sheet.game} />
        <Grid squares={ sheet.squares } variant='viewer' />
        <SheetSwitcher sheet={sheet} />
      </main>
    </AdminContext.Provider>
  )
}
