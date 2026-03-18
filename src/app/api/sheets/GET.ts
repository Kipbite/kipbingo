import clientPromise from "@/app/lib/mongodb";
import { apiFail, apiSuccess } from "@/app/lib/utilities";
import { MongoClient, Db, WithId, Document } from "mongodb";
import { NextRequest } from "next/server";

export default async function sheetsEndpointGet( request: NextRequest ) {
  let client: MongoClient;
  let db: Db;

  try {
    client = await clientPromise;
    db = client.db( process.env.DATABASE );
  } catch ( error ) {
    return apiFail( error );
  }

  const { searchParams } = new URL( request.url );
  const limit = parseInt( searchParams.get( 'limit' ) ) ?? 1;

  let response: WithId<Document>[];
  try {
    response = await db
      .collection( 'sheets' )
      .find()
      .sort({ updatedTime: -1 })
      .limit( limit )
      .toArray();

    if ( ! response || response.length < 1 ) {
      return apiFail( 'No sheets found' );
    }

    if ( limit === 1 ) {
      return apiSuccess( response[0] );
    } else {
      return apiSuccess( response );
    }
  } catch ( error ) {
    return apiFail( error );
  }
}
