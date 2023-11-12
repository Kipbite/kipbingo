import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export default async function sheetsEndpointGet(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  
  const { searchParams } = new URL(request.url);
  const limit = parseInt( searchParams.get('limit') ) ?? 1;

  const response = await db
    .collection( 'sheets' )
    .find()
    .limit( limit )
    .toArray()

  if ( limit === 1 ) {
    return NextResponse.json(response[0]);
  }

  return NextResponse.json(response);
}
