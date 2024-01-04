import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export default async function unfoldedSheetsEndpointGet(request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DATABASE);
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }

  const { searchParams } = new URL(request.url);
  const game = searchParams.get('game');
  const sheetId = searchParams.get('sheetId');
  const fields = searchParams.get('fields') ?? 'all';

  let findParams =
    sheetId ? { _id: new ObjectId(sheetId) } :
    game ? { game: game } :
    {};

  let response;
  try {
    response = await db
      .collection( 'sheets' )
      .findOne( findParams );
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }

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
      try {
        foundSquares = await db
          .collection('squares')
          .find({
            "_id": {
              "$in": squareIds
            }
          })
          .toArray()
        } catch (error) {
          return NextResponse.json({ success: false, message: error });
        }
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
    let foundGame;
    try {
      foundGame = await db
        .collection('games')
        .findOne({
          'name': data.game
        })
    } catch (error) {
      return NextResponse.json({ success: false, message: error });
    }
    
    if (foundGame) {
      data.game = foundGame;
    }
  }

  return NextResponse.json({ success: true, message: data });
}
