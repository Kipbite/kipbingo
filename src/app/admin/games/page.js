"use client";

import Trashcan from "@/app/components/Trashcan";
import { sendApiRequest } from "@/app/lib/utilities";
import { useEffect, useState } from "react";

export default function GameManagementPage() {
  const [ gameTypes, setGameTypes ] = useState([]);
  const [ newGameType, setNewGameType ] = useState('');
  const [ updateGameType, setUpdateGameType ] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await sendApiRequest( 'GET', '/games' );
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

          <div className="possibility new-possibility">
            <input
              type="text"
              placeholder="New game type"
              onChange={(e) => {
                setNewGameType(e.target.value);
              }}
              value={newGameType}
            />

            <button onClick={async () => {
              await sendApiRequest(
                'POST',
                '/games',
                null,
                { name: newGameType }
              );
              
              setNewGameType('');
              setUpdateGameType(updateGameType + 1);
            }}>
              Add
            </button>
          </div>
        </ul>
      </div>
    </main>
  );
}