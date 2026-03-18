"use client";

import Trashcan from "@/app/components/Trashcan";
import { uploadImage } from "@/app/lib/aws";
import { sendApiRequest } from "@/app/lib/utilities";
import { Game } from "@/app/types";
import { useEffect, useState } from "react";

export default function GameManagementPage() {
  const [ gameTypes, setGameTypes ] = useState<Game[]>( [] );
  const [ file, setFile ] = useState<File>();
  const [ newGameType, setNewGameType ] = useState( '' );
  const [ updateGameType, setUpdateGameType ] = useState( 0 );

  useEffect( () => {
    ( async () => {
      const response = await sendApiRequest<Game[]>( 'GET', '/games' );

      if ( ! response.success ) {
        console.error( `Error fetching games: ${ response.message }` );
        return;
      }

      setGameTypes( response.message );
    } )();
  }, [ updateGameType ] );

  async function handleUpload() {
    if ( ! file || newGameType === '' ) {
      alert( 'Please fill out the name field and upload an image' );
      return;
    }

    if (!file.type.includes('image')) {
      alert('Invalid file type, please upload an image');
      return;
    }

    await uploadImage( file );
    await sendApiRequest(
      'POST',
      '/games',
      null,
      {
        name: newGameType,
        image: `https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/${file.name}`
      }
    );
    // TODO: Deal with response properly

    setNewGameType( '' );
    setUpdateGameType( updateGameType + 1 );
  }

  return (
    <main className="container">
      <div>
        <h2>Game types</h2>
        <ul className="game-types">
          { gameTypes.map( gameType =>
            <div className="game-type" key={ gameType._id }>
              <span>{ gameType.name }</span>
              <span onClick={ async () => {
                const response = await sendApiRequest(
                  'DELETE',
                  '/games',
                  { id: gameType._id }
                );
                setUpdateGameType( updateGameType + 1 );

                // TODO: Deal with response properly
              } }>
                <Trashcan />
              </span>
            </div>
          ) }

          <div className="game-type possibility new-possibility">
            <div>
              <input
                type="text"
                placeholder="New game type"
                onChange={ e => setNewGameType( e.target.value ) }
                value={ newGameType }
              />

              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={ e => setFile( e.target.files?.[0] ) }
              />
            </div>

            <button onClick={ handleUpload }>
              Add
            </button>
          </div>
          <div className="filesize-label">
            Header image should be 500x105px
          </div>
        </ul>
      </div>
    </main>
  );
}