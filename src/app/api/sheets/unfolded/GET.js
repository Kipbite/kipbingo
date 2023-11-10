import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export default async function unfoldedSheetsEndpointGet(request) {
  const client = await clientPromise;
  const db = client.db(process.env.DATABASE);

  const { searchParams } = new URL(request.url);
  const game = searchParams.get('game');
  const sheetId = searchParams.get('sheetId');
  const fields = searchParams.get('fields') ?? 'all';

  let findParams =
    sheetId ? { _id: new ObjectId(sheetId) } :
    game ? { game: game } :
    {};

  const response = await db
    .collection( 'sheets' )
    .findOne( findParams );

  const data = response;

  if (fields === 'all' || fields === 'squares' || fields.includes('squares')) {
    const squareIds = [];
    Object.keys(data.squares).map((squareRef) => {
      const square = data?.squares?.[squareRef];
      if (square) {
        squareIds.push(new ObjectId(square.id));
      }
    });

    let foundSquares = [];
    if (squareIds.length > 0) {
      foundSquares = await db
        .collection('squares')
        .find({
          "_id": {
            "$in": squareIds
          }
        })
        .toArray()
    }

    if (foundSquares.length > 0) {
      let unfoldedSquares = {};
      Object.keys(data.squares).forEach((gridRef) => {
        const dataSquare = data.squares[gridRef];
    
        const foundIndex = foundSquares.findIndex((foundSquare) => {
          return foundSquare._id.toString() === dataSquare.id;
        });
    
        if (foundIndex !== -1) {
          unfoldedSquares[gridRef] = {
            ticked: dataSquare.ticked,
            ...foundSquares[foundIndex]
          };
        } else {
          unfoldedSquares[gridRef] = null;
        }
      });

      data.squares = unfoldedSquares;
    }
  }

  if (fields === 'all' || fields === 'game' || fields.includes('game')) {
    const foundGame = await db
      .collection('games')
      .findOne({
        'name': data.game
      })
    
    if (foundGame) {
      data.game = foundGame;
    }
  }

  return NextResponse.json(data);
}
