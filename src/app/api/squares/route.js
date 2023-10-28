import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("kipbingo_2");

    const response = await db
      .collection('sheets')
      .find({})
      .toArray();

    const data = response[0];

    // res.status(200).json({ squares });
    return NextResponse.json({ data });
  } catch (e) {
    // res.status(500).json({ error: 'failed to load data' });
    console.error(e);
  }
}
