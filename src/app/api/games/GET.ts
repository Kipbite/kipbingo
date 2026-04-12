import clientPromise from "@/app/lib/mongodb";
import { apiFail, apiSuccess } from "@/app/lib/utilities";
import { Db, MongoClient } from "mongodb";
import { NextRequest } from "next/server";

export default async function GET( request: NextRequest ) {
  let client: MongoClient;
  let db: Db;

  try {
    client = await clientPromise;
    db = client.db( process.env.DATABASE );
  } catch ( error ) {
    return apiFail( `Error connecting to database: ${ error }` );
  }

  const { searchParams } = new URL( request.url );
  const game = searchParams.get( 'game' );

  let response = null;
  try {
    if ( game ) {
      response = await db
        .collection( 'games' )
        .findOne( { name: game } );
    } else {
      response = await db
        .collection( 'games' )
        .find()
        .toArray();
    }

    return apiSuccess( response );
  } catch( error ) {
    return apiFail( error );
  }
}