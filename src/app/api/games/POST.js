import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export default async function gamesEndpointPost(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  const body = await request.json();
  
  const insertDoc = {};

  insertDoc.name = body.name ? body.name.toString() : '';
  insertDoc.header = 'https://placekitten.com/1080/227';

  const response = await db
    .collection( 'games' )
    .insertOne( insertDoc )

  return NextResponse.json( response );
} 