import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export default async function squaresEndpointGet(request) {
  let client;
  let db;

  try {
    client = await clientPromise;
    db = client.db(process.env.DATABASE);
  } catch(error) {
    return NextResponse.json({ success: false, message: error });
  }

  
  const { searchParams } = new URL(request.url);
  const findParams = { "game": searchParams.get('game') };

  if ( searchParams.get('active') !== null ) {
    findParams.active = JSON.parse( searchParams.get('active') );
  }

  try {
    const response = await db
      .collection('squares')
      .find( findParams )
      .toArray()
    
    return NextResponse.json({ success: true, message: response });
  } catch(error) {
    return NextResponse.json({ success: false, message: error });
  }
} 