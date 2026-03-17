import clientPromise from "@/app/lib/mongodb";
import { apiSuccess } from "@/app/lib/utilities";
import { ObjectId } from "bson";
import { NextRequest } from "next/server";

export default async function sheetsEndpointPatch( request: NextRequest ) {
  const client = await clientPromise;
  const db = client.db( process.env.DATABASE );
  const body = await request.json();
  
  const response = await db
    .collection( 'sheets' )
    .updateOne(
      { _id: new ObjectId( body.id ) },
      { $set: {
        squares: body.squares,
        updatedTime: Date.now()
      } }
    );

  return apiSuccess( response );
}