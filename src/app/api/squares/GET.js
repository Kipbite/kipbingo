import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export default async function squaresEndpointGet(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  
  const { searchParams } = new URL(request.url);
  const game = searchParams.get('game');

  const response = await db
    .collection('squares')
    .find({
      "game": game,
    })
    .toArray()

  return NextResponse.json( response );
} 