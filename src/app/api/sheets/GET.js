import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export default async function sheetsEndpointGet(request) {
  let client;
  let db;

  try {
    client = await clientPromise;
    db = client.db(process.env.DATABASE);
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
  
  const { searchParams } = new URL(request.url);
  const limit = parseInt( searchParams.get('limit') ) ?? 1;

  let response;
  try {
    response = await db
      .collection( 'sheets' )
      .find()
      .limit( limit )
      .toArray()

    if ( limit === 1 ) {
      return NextResponse.json({ success: true, message: response[0] });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }

  return NextResponse.json({ success: true, message: response });
}
