import clientPromise from "@/app/lib/mongodb";
import { emptyGridRefs, formatDate } from "@/app/lib/utilities";
import { NextResponse } from "next/server";

export default async function sheetsEndpointPost(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  const body = await request.json();
  
  const insertDoc = {};
  
  const squaresTemplate = emptyGridRefs;
  Object.keys(squaresTemplate).forEach((key) => {
    squaresTemplate[key] = body?.squares?.[key]?._id ?? null;
  });

  insertDoc.game = body.game ? body.game.toString() : 'Unknown Game';
  insertDoc.name = body.name ? body.name.toString() : insertDoc.game + ' ' + formatDate();
  insertDoc.squares = squaresTemplate;
  
  const response = await db
    .collection( 'sheets' )
    .insertOne( insertDoc )

  return NextResponse.json(response);
}