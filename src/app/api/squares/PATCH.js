import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export default async function squaresEndpointPatch(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  const body = await request.json();
  
  if (!body.id) {
    return NextResponse.json({ error: 'no id passed' });
  }

  const response = await db
    .collection( 'squares' )
    .updateOne(
      { _id: new ObjectId( body.id ) },
      { $set: {
        active: body.active
      } }
    )

  return NextResponse.json( response );
}