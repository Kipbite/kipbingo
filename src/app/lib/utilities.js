export function nextLetter(letter) {
  letter = letter.toString();
  return String.fromCharCode(letter.charCodeAt(0) + 1);
}

export const emptyGridRefs = {
  A0: null, A1: null, A2: null, A3: null, A4: null,
  B0: null, B1: null, B2: null, B3: null, B4: null,
  C0: null, C1: null, C2: null, C3: null, C4: null,
  D0: null, D1: null, D2: null, D3: null, D4: null,
  E0: null, E1: null, E2: null, E3: null, E4: null,
};

export function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

export function makeId(length) {
  let result = '';
  const characters = 
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }

  return result;
}

export async function sendApiRequest(
  method,
  endpoint,
  urlParams = null,
  body = null
) {
  urlParams = urlParams ? new URLSearchParams( urlParams ) : '';

  const options = {
    cache: "no-store",
    method
  };

  if (method === 'POST' && body) {
    options.body = JSON.stringify(body);
  }

  return await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/${endpoint}?${urlParams}`,
    options
  )
    .then((res) => res.json())
    .catch((e) => console.error(e))
}

export async function getSheetSquares({ sheetId = null, game = null }) {
  const urlParams = {};
  if (sheetId) {
    urlParams.sheetId = sheetId;
  }
  if (game) {
    urlParams.game = game;
  }

  return await sendApiRequest( 'GET', '/sheets', urlParams );
}

export async function getGame(game) {
  return await sendApiRequest( 'GET', '/games', { game } );
}

export async function getSquares(game) {
  return await sendApiRequest( 'GET', '/squares', { game } );
}

export async function saveSheet(body) {
  return await sendApiRequest( 'POST', '/sheets', null, body );
}