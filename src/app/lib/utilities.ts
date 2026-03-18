import { NextResponse } from "next/server";
import { ApiMethod, ApiResponse, Grid, GridRef, Sheet } from "../types";
import { Dispatch } from "react";

/**
 * Returns the character immediately after the passed character
 */
export function nextLetter( letter: string ) {
  letter = letter.toString();
  return String.fromCharCode( letter.charCodeAt( 0 ) + 1 );
}

/**
 * An object containing every grid reference as an object with id: null and ticked: {bool}
 */
export const emptyGridRefs: Grid = {
  A0: null, A1: null, A2: null, A3: null, A4: null,
  B0: null, B1: null, B2: null, B3: null, B4: null,
  C0: null, C1: null, C2: null, C3: null, C4: null,
  D0: null, D1: null, D2: null, D3: null, D4: null,
  E0: null, E1: null, E2: null, E3: null, E4: null,
};

/**
 * Converts a Date to a human-readable string
 */
export function formatDate( date: Date = new Date ) {
  const dd = String( date.getDate() ).padStart( 2, '0' );
  const mm = String( date.getMonth() + 1 ).padStart( 2, '0' );
  const yyyy = date.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}

/**
 * Is the passed string valid JSON or not
 */
export function isJsonString( string: string ) {
  try {
    JSON.parse( string );
  } catch ( e ) {
    return false;
  }

  return true;
}

/**
 * Send a request to this site's API
 */
export async function sendApiRequest<T>(
  method: ApiMethod,
  endpoint: `/${ string }`,
  urlParams: Record<string, string> = null,
  body: any = null,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const queryParams = urlParams ? new URLSearchParams( urlParams ) : '';

  options = {
    cache: 'no-store',
    method,
    ...options
  };

  if ( [ 'POST', 'PATCH' ].includes( method ) && body ) {
    options.body = JSON.stringify( body );
  }

  return await fetch(
    `${ process.env.NEXT_PUBLIC_SITE_URL }/api${ endpoint }?${ queryParams }`,
    options
  )
    .then( res => res.json() )
    .catch( e => console.error( e ) )
}

/**
 * Sets the golden squares if there's a straight line
 * of 5 ticked squares
 */
export async function winChecker(
  setGoldenSquares: Dispatch<GridRef[]>,
  squares: Sheet['squares']
) {
  let tempGoldenSquares: GridRef[] = [];
  let hasBingo = false;

  function checkForBingo( gridRefs: GridRef[] ) {
    let bingo = true;
    for ( const gridRef of gridRefs ) {
      if ( ! squares[ gridRef ]?.ticked ) {
        bingo = false;
      }
    }

    return bingo;
  }

  const rows = {
    'A': false, 'B': false, 'C': false, 'D': false, 'E': false
  };

  const columns = {
    0: false, 1: false, 2: false, 3: false, 4: false
  };

  const diagonals: GridRef[][] = [
    [ 'A0', 'B1', 'C2', 'D3', 'E4' ],
    [ 'E0', 'D1', 'C2', 'B3', 'A4' ]
  ]

  for ( let row in rows ) {
    let gridRefs: GridRef[] = [];
    for ( let column in columns ) {
      gridRefs.push( `${ row }${ column }` as GridRef );
    }

    if ( checkForBingo( gridRefs ) ) {
      hasBingo = true;
      gridRefs.forEach( gridRef =>
        tempGoldenSquares.push( gridRef )
      );
    }
  }

  for ( let column in columns ) {
    let gridRefs: GridRef[] = [];
    for ( let row in rows ) {
      gridRefs.push( `${ row }${ column }` as GridRef );
    }

    if ( checkForBingo( gridRefs ) ) {
      hasBingo = true;
      gridRefs.forEach( gridRef =>
        tempGoldenSquares.push( gridRef )
      );
    }
  }

  for ( let diagonal in diagonals ) {
    const gridRefs = diagonals[ diagonal ];

    if ( checkForBingo( gridRefs ) ) {
      hasBingo = true;
      gridRefs.forEach( gridRef => 
        tempGoldenSquares.push( gridRef )
      )
    }
  }

  if ( hasBingo ) {
    const mixitupData = {
      event: 'bingo'
    }
    // fireMixitupWebhook(mixitupData);
  }

  setGoldenSquares( [ ...tempGoldenSquares ] );
}

export async function fireMixitupWebhook( data: any ) {
  const url = `${ process.env.NEXT_PUBLIC_SITE_URL }/api/mixitup`;

  return await fetch(
    url,
    {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify( data )
    }
  )
    .then( res => res.text() )
    .catch( e => console.error( e ) )
}

export function apiFail<T>( message: T ) {
  return NextResponse.json( { success: false, message } );
}

export function apiSuccess<T>( message: T ) {
  return NextResponse.json( { success: true, message } );
}