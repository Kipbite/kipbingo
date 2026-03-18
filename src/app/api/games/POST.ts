import clientPromise from "@/app/lib/mongodb";
import { apiFail, apiSuccess } from "@/app/lib/utilities";
import { Db, MongoClient } from "mongodb";
import { NextRequest } from "next/server";

export default async function gamesEndpointPost( request: NextRequest ) {
  let client: MongoClient;
  let db: Db;

  try {
    client = await clientPromise;
    db = client.db( process.env.DATABASE );
  } catch ( error ) {
    return apiFail( `Error connecting to database: ${ error }` );
  }

  const body = await request.json() as {
    name?: string
    image?: string
  };

  if ( ! body.name ) {
    return apiFail( 'Missing name in POST body' );
  }

  const insertDoc = {
    name: body.name.toString(),
    header: body.image ? body.image.toString() : 'https://placehold.co/1080x227'
  };

  const response = await db
    .collection( 'games' )
    .insertOne( insertDoc );

  return apiSuccess( response );
} 