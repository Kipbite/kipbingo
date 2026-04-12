import clientPromise from "@/app/lib/mongodb";
import { apiFail, apiSuccess } from "@/app/lib/utilities";
import { MongoClient, Db, Filter, Document } from "mongodb";
import { NextRequest } from "next/server";

export default async function GET( request: NextRequest ) {
  let client: MongoClient;
  let db: Db;

  try {
    client = await clientPromise;
    db = client.db( process.env.DATABASE );
  } catch ( error ) {
    return apiFail( error );
  }

  
  const { searchParams } = new URL( request.url );
  const findParams: Filter<Document> = { "game": searchParams.get( 'game' ) };

  if ( searchParams.get( 'active' ) !== null ) {
    findParams.active = JSON.parse( searchParams.get( 'active' ) );
  }

  try {
    const response = await db
      .collection('squares')
      .find( findParams )
      .toArray();

    return apiSuccess( response );
  } catch ( error ) {
    return apiFail( error );
  }
}