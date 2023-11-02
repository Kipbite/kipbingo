import sheetsEndpointGet from "./GET";
import sheetsEndpointPost from "./POST";
import sheetsEndpointPatch from "./PATCH";

export async function GET(request) {
  return await sheetsEndpointGet(request);
}

export async function POST(request) {
  return await sheetsEndpointPost(request);
}

export async function PATCH(request) {
  return await sheetsEndpointPatch(request);
}