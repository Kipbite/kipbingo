/**
 * Returns the character immediately after the passed character
 * 
 * @param {string} letter 
 * @returns {string}
 */
export function nextLetter(letter) {
  letter = letter.toString();
  return String.fromCharCode(letter.charCodeAt(0) + 1);
}

/**
 * @description An object containing every grid reference as an object with id: null and ticked: {bool}
 */
export const emptyGridRefs = {
  A0: { id: null, ticked: false }, A1: { id: null, ticked: false }, A2: { id: null, ticked: false }, A3: { id: null, ticked: false }, A4: { id: null, ticked: false },
  B0: { id: null, ticked: false }, B1: { id: null, ticked: false }, B2: { id: null, ticked: false }, B3: { id: null, ticked: false }, B4: { id: null, ticked: false },
  C0: { id: null, ticked: false }, C1: { id: null, ticked: false }, C2: { id: null, ticked: false }, C3: { id: null, ticked: false }, C4: { id: null, ticked: false },
  D0: { id: null, ticked: false }, D1: { id: null, ticked: false }, D2: { id: null, ticked: false }, D3: { id: null, ticked: false }, D4: { id: null, ticked: false },
  E0: { id: null, ticked: false }, E1: { id: null, ticked: false }, E2: { id: null, ticked: false }, E3: { id: null, ticked: false }, E4: { id: null, ticked: false },
};

/**
 * Converts a Date to a human-readable string
 * 
 * @param {Date} date 
 * @returns {string}
 */
export function formatDate(date = new Date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}

/**
 * Is the passed string valid JSON or not
 * 
 * @param {string} str 
 * @returns {boolean}
 */
export function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

/**
 * Send a request to this site's API
 * 
 * @param {string} method
 * @param {string} endpoint 
 * @param {Object} [urlParams] 
 * @param {Object} [body] 
 * @param {Object} [options] 
 * @returns {NextResponse}
 */
export async function sendApiRequest(
  method,
  endpoint,
  urlParams = null,
  body = null,
  options = {}
) {
  urlParams = urlParams ? new URLSearchParams( urlParams ) : '';

  options = {
    cache: "no-store",
    method,
    ...options
  };

  if ([ 'POST', 'PATCH' ].includes(method) && body) {
    options.body = JSON.stringify(body);
  }

  return await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api${endpoint}?${urlParams}`,
    options
  )
    .then((res) => res.json())
    .catch((e) => console.error(e))
}
