"use client";

import Trashcan from "@/app/components/Trashcan";
import { uploadImage } from "@/app/lib/aws";
import { sendApiRequest } from "@/app/lib/utilities";
import { useEffect, useState } from "react";

export default function GameManagementPage() {
  const [ gameTypes, setGameTypes ] = useState([]);
  const [ file, setFile ] = useState();
  const [ newGameType, setNewGameType ] = useState('');
  const [ updateGameType, setUpdateGameType ] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await sendApiRequest( 'GET', '/games' );

      if (!response.success) {
        console.error('Error fetching games: ', response.message)
        return;
      }

      setGameTypes(response);
    })()
  }, [ updateGameType ]);

  return (
    <main className="container">
      <div>
        <h2>Game types</h2>
        <ul className="game-types">
          {gameTypes.map((gameType) => {
            return (
              <div className="game-type" key={gameType._id}>
                <span>{gameType.name}</span>
                <span onClick={async () => {
                  const response = await sendApiRequest('DELETE', '/games', { id: gameType._id });
                  setUpdateGameType(updateGameType + 1);
                }}>
                  <Trashcan />
                </span>
              </div>
            )
          })}

          <div className="game-type possibility new-possibility">
            <div>
              <input
                type="text"
                placeholder="New game type"
                onChange={(e) => {
                  setNewGameType(e.target.value);
                }}
                value={newGameType}
              />

              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files?.[0]);
                }}
              />
            </div>

            <button onClick={async () => {
              if (!file || newGameType === '') {
                alert('Please fill out the name field and upload an image');
                return;
              }

              if (!file.type.includes('image')) {
                alert('Invalid file type, please upload an image');
                return;
              }

              await uploadImage(file);
              await sendApiRequest(
                'POST',
                '/games',
                null,
                {
                  name: newGameType,
                  image: `https://kipbite-assets.fra1.digitaloceanspaces.com/kipbingo/${file.name}`
                }
              );

              setNewGameType('');
              setUpdateGameType(updateGameType + 1);
            }}>
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