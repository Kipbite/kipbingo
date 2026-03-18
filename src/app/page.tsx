"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, sendApiRequest, winChecker } from "./lib/utilities";
import Grid from "./components/Grid";
import GameHeader from "./components/GameHeader";
import SheetSwitcher from "./components/SheetSwitcher";
import AdminContext, { HomepageContext } from "./context";
import { Grid as GridType, GridRef, Sheet } from "./types";

export default function HomePage() {
  const [ sheet, setSheet ] = useState<Sheet>();
  const [ goldenSquares, setGoldenSquares ] = useState<GridRef[]>( [] );

  useEffect( () => {
    const refreshTime = 1000 * 60 // 1 min

    const refreshData = async function() {
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

      setTimeout(() => {
        refreshData();
      }, refreshTime );
    }

    refreshData();
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
        <Grid squares={ sheet.squares } variant='play' />
        <SheetSwitcher sheet={sheet} />
      </main>
    </AdminContext.Provider>
  )
}
