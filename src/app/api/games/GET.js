import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export default async function gamesEndpointGet(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
  } catch(error) {
    return NextResponse.json({ success: false, message: error });
  }
  
  const { searchParams } = new URL(request.url);
  const game = searchParams.get('game');
  
  let response = null;
  try {
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

    return NextResponse.json({ success: true, message: response });
  } catch(error) {
    return NextResponse.json({ success: false, message: error });
  }
}