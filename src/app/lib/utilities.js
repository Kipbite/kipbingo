export function nextLetter(letter) {
  letter = letter.toString();
  return String.fromCharCode(letter.charCodeAt(0) + 1);
}

export async function getSquares() {
  return await fetch(`${process.env.SITE_URL}/api/squares`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((e) => console.error(e))
}

export async function getGame(game) {
  return await fetch(`${process.env.SITE_URL}/api/games?game=${game}&foo=bar`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch((e) => console.error(e))
}