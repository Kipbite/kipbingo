import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export default async function sheetsEndpointDelete(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'no id passed' });
  }

  const response = await db
    .collection( 'sheets' )
    .deleteOne({ _id: new ObjectId( id ) })

  return NextResponse.json( response );
}