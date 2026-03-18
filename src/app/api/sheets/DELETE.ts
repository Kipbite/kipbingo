import clientPromise from "@/app/lib/mongodb";
import { apiFail, apiSuccess } from "@/app/lib/utilities";
import { ObjectId } from "bson";
import { NextRequest } from "next/server";

export default async function sheetsEndpointDelete( request: NextRequest ) {
  const client = await clientPromise;
  const db = client.db( process.env.DATABASE );

  const { searchParams } = new URL( request.url );
  const id = searchParams.get( 'id' );
  
  if ( ! id ) {
    return apiFail( 'Missing id in GET request' );
  }

  const response = await db
    .collection( 'sheets' )
    .deleteOne( { _id: new ObjectId( id ) } )

  return apiSuccess( response );
}