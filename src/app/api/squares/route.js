import squaresEndpointGet from "./GET";
import squaresEndpointPost from "./POST";

export async function GET(request) {
  return await squaresEndpointGet(request);
}

export async function POST(request) {
  return await squaresEndpointPost(request);
}