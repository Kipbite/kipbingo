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

export async function getSheetSquares({ sheetId = null, game = null }) {
  let urlParams = '?';

  if (sheetId) {
    urlParams += `sheetId=${sheetId}&`;
  }

  if (game) {
    urlParams += `game=${game}&`;
  }

  return await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/sheet-squares${urlParams}`,
    { cache: "no-store" }
  )
    .then((res) => res.json())
    .catch((e) => console.error(e))
}

export async function getGame(game) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/games?game=${game}`,
    { cache: "no-store" }
  )
    .then((res) => res.json())
    .catch((e) => console.error(e))
}

export async function getSquares(game) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/squares?game=${game}`,
    { cache: "no-store" }
  )
    .then((res) => res.json())
    .catch((e) => console.error(e))
}