import { NextRequest } from "next/server";
import gamesEndpointDelete from "./DELETE";
import gamesEndpointGet from "./GET";
import gamesEndpointPost from "./POST";

export async function GET( request: NextRequest ) {
  return await gamesEndpointGet( request );
}

export async function POST( request: NextRequest ) {
  return await gamesEndpointPost( request );
}

export async function DELETE( request: NextRequest ) {
  return await gamesEndpointDelete( request );
}