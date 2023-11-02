import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export default async function sheetsEndpointPatch(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  const body = await request.json();
  
  const response = await db
    .collection('sheets')
    .updateOne(
      { _id: new ObjectId( body.id ) },
      { $set: { squares: body.squares } }
    )
  
  return NextResponse.json(response);
}