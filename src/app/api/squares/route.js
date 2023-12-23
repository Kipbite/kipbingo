import { NextResponse } from "next/server";
import squaresEndpointGet from "./GET";
import squaresEndpointPost from "./POST";
import squaresEndpointDelete from "./DELETE";

export async function GET(request) {
  return await squaresEndpointGet(request);
}

export async function POST(request) {
  return await squaresEndpointPost(request);
}

export async function DELETE(request) {
  try {
    const response = await squaresEndpointDelete(request);
    return response;
  } catch (error) {
    return NextResponse.json(error);
  }
}