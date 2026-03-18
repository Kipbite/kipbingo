"use client"

import { useEffect, useState } from "react";
import { emptyGridRefs, sendApiRequest } from "../../lib/utilities";
import AdminContext, { NewContext } from "../../context";
import GameHeader from "../../components/GameHeader";
import Grid from "../../components/Grid";
import SquarePickerList from "../../components/SquarePickerList";
import SaveButton from "@/app/components/SaveButton";
import NameInput from "@/app/components/NameInput";
import GamePicker from "@/app/components/GamePicker";
import SquarePicker from "@/app/components/SquarePicker";
import RandomiseButton from "@/app/components/RandomiseButton";
import { Game, Grid as GridType, Square } from "@/app/types";

export default function AdminPage({}) {
  const [ gameType, setGameType ] = useState( 'yakuza' );
  const [ game, setGame ] = useState<Game>( null );
  const [ squares, setSquares ] = useState<ReturnType<typeof SquarePicker>[]>();
  const [ activeSquares, setActiveSquares ] = useState<GridType>( emptyGridRefs );
  const [ draggedSquare, setDraggedSquare ] = useState<Square>( null );
  const [ sheetName, setSheetName ] = useState( '' );
  const [ updateSquares, setUpdateSquares ] = useState( 0 );

  useEffect( () => {
    ( async () => {
      const response = await sendApiRequest<Game>(
        'GET',
        '/games',
        { game: gameType }
      );

      if ( ! response.success ) {
        console.error( `Error fetching games: ${ response.message }` );
        return;
      }

      setGame( response.message );
    } )();
  }, [ gameType ] );

  useEffect( () => {
    ( async () => {
      const response = await sendApiRequest<Square[]>(
        'GET',
        '/squares',
        { game: game?.name, active: 'true' }
      );

      if ( ! response.success ) {
        console.error( `Error fetching squares: ${ response.message }` );
        return;
      }

      const tempSquares = response.message;
      const optionList: ReturnType<typeof SquarePicker>[] = [];
      tempSquares.forEach( square => {
        optionList.push(
          <SquarePicker key={ square._id } square={ square } />
        );
      } );

      setSquares( optionList );
    })();
  }, [ game, updateSquares ]);

  if ( ! game ) {
    return <main className="container">Loading...</main>;
  }

  const contextOptions: NewContext = {
    isAdmin: true,
    squares, setSquares,
    activeSquares, setActiveSquares,
    draggedSquare, setDraggedSquare,
    sheetName, setSheetName,
    gameType, setGameType,
    updateSquares, setUpdateSquares,
  }

  return (
    <AdminContext.Provider value={ contextOptions }>
      <main className="container">
        <div>
          <GameHeader game={ game } />
          <Grid squares={ activeSquares } variant="edit" />
          <div className="save-form">
            <NameInput />
            <SaveButton />
          </div>
        </div>
        
        <div>
          <SquarePickerList />
          <GamePicker />
          <RandomiseButton />
        </div>
      </main>
    </AdminContext.Provider>
  )
}