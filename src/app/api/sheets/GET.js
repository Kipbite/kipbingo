import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export default async function sheetsEndpointGet(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  
  const { searchParams } = new URL(request.url);
  const game = searchParams.get('game');
  const sheetId = searchParams.get('sheetId');
  
  let findParams =
    sheetId ? { _id: new ObjectId(sheetId) } :
    game ? { game: game } :
    {};

  const response = await db
    .collection( 'sheets' )
    .findOne( findParams );

  return NextResponse.json(response);
}
