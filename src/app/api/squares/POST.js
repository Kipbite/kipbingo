import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export default async function squaresEndpointPost(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  const body = await request.json();
  
  let response = {};
  const insertDoc = {};

  insertDoc.game = body.game ? body.game.toString() : 'Unknown Game';
  insertDoc.text = body.text ? body.text.toString() : '';

  const getResponse = await db
    .collection( 'squares' )
    .find( insertDoc )
    .toArray()
  
  if ( getResponse.length > 0 ) {
    response = await db
      .collection( 'squares' )
      .updateOne(
        { _id: new ObjectId( getResponse[0]._id ) },
        { $set: {
          active: true
        } }
      )
  } else {
    insertDoc.active = true;
  
    response = await db
      .collection( 'squares' )
      .insertOne( insertDoc )
  }


  return NextResponse.json( response );
} 