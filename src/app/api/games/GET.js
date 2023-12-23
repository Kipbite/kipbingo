import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function gamesEndpointGet(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);

  const { searchParams } = new URL(request.url);
  const game = searchParams.get('game');
  
  let response = null;
  if (game) {
    response = await db
      .collection('games')
      .findOne({ name: game })
  } else {
    response = await db
      .collection('games')
      .find()
      .toArray()
  }

  return NextResponse.json(response);
}