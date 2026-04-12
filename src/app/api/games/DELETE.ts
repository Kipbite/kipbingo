import clientPromise from "@/app/lib/mongodb";
import { apiFail, apiSuccess } from "@/app/lib/utilities";
import { ObjectId } from "bson";
import { NextRequest } from "next/server";

export default async function DELETE( request: NextRequest ) {
  const client = await clientPromise;
  const db = client.db( process.env.DATABASE );

  const { searchParams } = new URL( request.url );
  const id = searchParams.get( 'id' );
  
  if ( ! id ) {
    return apiFail( 'No id passed to DELETE endpoint' );
  }

  const response = await db
    .collection( 'games' )
    .deleteOne( { _id: new ObjectId( id ) } );

  return apiSuccess( response );
}