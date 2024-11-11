import { NextResponse } from "next/server";
import squaresEndpointGet from "./GET";
import squaresEndpointPost from "./POST";
import squaresEndpointPatch from "./PATCH";

export async function GET(request) {
  return await squaresEndpointGet(request);
}

export async function POST(request) {
  return await squaresEndpointPost(request);
}

export async function PATCH(request) {
  try {
    const response = await squaresEndpointPatch(request);
    return response;
  } catch (error) {
    return NextResponse.json(error);
  }
}