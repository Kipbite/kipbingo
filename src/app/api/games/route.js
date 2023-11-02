import { gamesEndpointGet } from "./GET";

export async function GET(request) {
  return await gamesEndpointGet(request);
}