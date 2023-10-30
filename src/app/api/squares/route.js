import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);

    const response = await db
      .collection('sheets')
      .findOne({});

    const data = response;

    const squareIds = [];
    Object.keys(data.squares).map((squareRef) => {
      const square = data.squares[squareRef];
      squareIds.push(new ObjectId(square));
    });

    const foundSquares = await db
      .collection('squares')
      .find({
        "_id": {
          "$in": squareIds
        }
      })
      .toArray();
    
    let unfoldedSquares = {};
    Object.keys(data.squares).forEach((gridRef) => {
      const dataSquare = data.squares[gridRef];

      const foundIndex = foundSquares.findIndex((foundSquare) => {
        return foundSquare._id.toString() === dataSquare;
      });

      if (foundIndex !== -1) {
        unfoldedSquares[gridRef] = foundSquares[foundIndex];
      } else {
        unfoldedSquares[gridRef] = null;
      }
    });

    return NextResponse.json(unfoldedSquares);
  } catch (e) {
    return NextResponse.json({ error: 'failed to load data' });
  }
}