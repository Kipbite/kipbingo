import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function gamesEndpointGet(request, foo) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);

  const { searchParams } = new URL(request.url);
  const game = searchParams.get('game');
  
  const response = await db
    .collection('games')
    .findOne({ 'name': game });

  return NextResponse.json(response);
}