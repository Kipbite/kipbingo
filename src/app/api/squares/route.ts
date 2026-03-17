import { NextRequest, NextResponse } from "next/server";
import squaresEndpointGet from "./GET";
import squaresEndpointPost from "./POST";
import squaresEndpointPatch from "./PATCH";

export async function GET( request: NextRequest ) {
  return await squaresEndpointGet( request );
}

export async function POST( request: NextRequest ) {
  return await squaresEndpointPost( request );
}

export async function PATCH( request: NextRequest ) {
  return await squaresEndpointPatch( request );
}