import clientPromise from "@/app/lib/mongodb";
import { apiSuccess, emptyGridRefs, formatDate } from "@/app/lib/utilities";
import { Document, OptionalId } from "mongodb";
import { NextRequest } from "next/server";

export default async function POST( request: NextRequest ) {
  const client = await clientPromise;
  const db = client.db( process.env.DATABASE );
  const body = await request.json();

  const insertDoc: OptionalId<Document> = { updatedTime: Date.now() };

  const squaresTemplate = emptyGridRefs;
  Object.keys( squaresTemplate ).forEach( key => {
    squaresTemplate[ key ] = {
      id: body.squares[ key ]?._id,
      ticked: body.squares[ key ]?.ticked ?? false
    }
  } );

  insertDoc.game = body.game ? body.game.toString() : 'Unknown Game';
  insertDoc.name = body.name ? body.name.toString() : `${ insertDoc.game } ${ formatDate() }`;
  insertDoc.squares = squaresTemplate;

  const response = await db
    .collection( 'sheets' )
    .insertOne( insertDoc );

  return apiSuccess( response );
}