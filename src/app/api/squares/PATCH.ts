import clientPromise from "@/app/lib/mongodb";
import { apiFail, apiSuccess } from "@/app/lib/utilities";
import { ObjectId } from "bson";
import { NextRequest } from "next/server";

export default async function PATCH( request: NextRequest ) {
  const client = await clientPromise;
  const db = client.db( process.env.DATABASE );
  const body = await request.json();
  
  if ( ! body.id ) {
    return apiFail( 'No id passed to PATCH request' );
  }

  const response = await db
    .collection( 'squares' )
    .updateOne(
      { _id: new ObjectId( body.id ) },
      { $set: {
        active: body.active
      } }
    );

  return apiSuccess( response );
}