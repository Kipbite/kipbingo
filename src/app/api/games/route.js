import gamesEndpointDelete from "./DELETE";
import gamesEndpointGet from "./GET";
import gamesEndpointPost from "./POST";

export async function GET(request) {
  return await gamesEndpointGet(request);
}

export async function POST(request) {
  return await gamesEndpointPost(request);
}

export async function DELETE(request) {
  return await gamesEndpointDelete(request);
}