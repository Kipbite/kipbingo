import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export default async function squaresEndpointPost(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  const body = await request.json();
  
  const insertDoc = {};

  insertDoc.game = body.game ? body.game.toString() : 'Unknown Game';
  insertDoc.text = body.text ? body.text.toString() : '';
  insertDoc.active = true;

  const response = await db
    .collection( 'squares' )
    .insertOne( insertDoc )

  return NextResponse.json( response );
} 