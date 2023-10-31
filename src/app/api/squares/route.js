import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export async function GET(request) {
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