import sheetsEndpointGet from "./GET";
import sheetsEndpointPost from "./POST";
import sheetsEndpointPatch from "./PATCH";
import sheetsEndpointDelete from "./DELETE";
import { NextRequest } from "next/server";

export async function GET( request: NextRequest ) {
  return await sheetsEndpointGet( request );
}

export async function POST( request: NextRequest ) {
  return await sheetsEndpointPost( request );
}

export async function PATCH( request: NextRequest ) {
  return await sheetsEndpointPatch( request );
}

export async function DELETE( request: NextRequest ) {
  return await sheetsEndpointDelete( request );
}