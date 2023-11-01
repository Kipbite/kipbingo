import clientPromise from "@/app/lib/mongodb";
import { emptyGridRefs, formatDate, makeId } from "@/app/lib/utilities";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";
import { useId } from "react";

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  
  const { searchParams } = new URL(request.url);
  const game = searchParams.get('game');
  const sheetId = searchParams.get('sheetId');
  
  let findParams =
    sheetId ? { _id: new ObjectId(sheetId) } :
    game ? { game: game } :
    {};

  const response = await db
    .collection( 'sheets' )
    .findOne( findParams );

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
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);
  const body = await request.json();
  
  const insertDoc = {};
  
  const squaresTemplate = emptyGridRefs;
  Object.keys(squaresTemplate).forEach((key) => {
    squaresTemplate[key] = body?.squares?.[key] ?? null;
  });

  insertDoc.game = body.game ? body.game.toString() : 'Unknown Game';
  insertDoc.name = body.name ? body.name.toString() : insertDoc.game + ' ' + formatDate();
  insertDoc.squares = squaresTemplate;
  
  const response = await db
    .collection( 'sheets' )
    .insertOne( insertDoc )

  return NextResponse.json(response);
}