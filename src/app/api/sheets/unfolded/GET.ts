import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "bson";
import { Db, MongoClient, WithId, Document } from "mongodb";
import { NextRequest } from "next/server";
import { apiFail, apiSuccess } from "@/app/lib/utilities";

export default async function unfoldedSheetsEndpointGet( request: NextRequest ) {
  let client: MongoClient;
  let db: Db;

  try {
    client = await clientPromise;
    db = client.db( process.env.DATABASE );
  } catch ( error ) {
    return apiFail( `Error connecting to database: ${ error }` );
  }

  const { searchParams } = new URL( request.url );
  const game    = searchParams.get( 'game' );
  const sheetId = searchParams.get( 'sheetId' );
  const fields  = searchParams.get( 'fields' ) ?? 'all';

  let findParams =
    sheetId ? { _id: new ObjectId( sheetId ) } :
    game ? { game: game } :
    {};

  let data: WithId<Document>;
  try {
    const response = await db
      .collection( 'sheets' )
      .find( findParams )
      .sort({ updatedTime: -1 })
      .toArray();

    if ( ! response || response.length < 1 ) {
      return apiFail( 'No results found for unfolded sheet' );
    }

    data = response[0];
  } catch ( error ) {
    return apiFail( error );
  }

  if (
    fields === 'all' ||
    fields === 'squares' ||
    fields.includes( 'squares' )
  ) {
    const squareIds = [];
    Object.keys( data.squares ).forEach( squareRef => {
      const square = data?.squares?.[ squareRef ];
      if ( square ) {
        squareIds.push( new ObjectId( square.id ) );
      }
    } );

    let foundSquares = [];
    if ( squareIds.length > 0 ) {
      try {
        foundSquares = await db
          .collection( 'squares' )
          .find({
            "_id": {
              "$in": squareIds
            }
          } )
          .toArray()
        } catch ( error ) {
          return apiFail( error );
        }
    }

    if ( foundSquares.length > 0 ) {
      let unfoldedSquares = {};
      Object.keys( data.squares ).forEach( gridRef => {
        const dataSquare = data.squares[ gridRef ];
    
        const foundIndex = foundSquares.findIndex( s => 
          s._id.toString() === dataSquare.id
        );
    
        if ( foundIndex !== -1 ) {
          unfoldedSquares[ gridRef ] = {
            ticked: dataSquare.ticked,
            ...foundSquares[ foundIndex ]
          };
        } else {
          unfoldedSquares[ gridRef ] = null;
        }
      });

      data.squares = unfoldedSquares;
    }
  }

  if (
    fields === 'all' ||
    fields === 'game' ||
    fields.includes( 'game' )
  ) {
    let foundGame: WithId<Document>;
    try {
      foundGame = await db
        .collection('games')
        .findOne( { 'name': data.game } )
    } catch ( error ) {
      return apiFail( error );
    }
    
    if ( foundGame ) {
      data.game = foundGame;
    }
  }

  return apiSuccess( data );
}
