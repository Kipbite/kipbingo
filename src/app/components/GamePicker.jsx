import { useContext, useEffect, useState } from "react";
import { sendApiRequest } from "../lib/utilities";
import AdminContext from "../context";

export default function GamePicker({}) {
  const [ games, setGames ] = useState();
  const { setGameType } = useContext(AdminContext);

  useEffect(() => {
    (async () => {
      const response = await sendApiRequest('GET', '/games');

      if (!response.success) {
        console.error('Error with fetching games: ', response.message);
        return;
      }

      const tempGames = response.message;
      const gameElements = tempGames.map((game) => {
        return(
          <option key={game._id} value={game.name}>
            {game.name}
          </option>
        )
      });

      setGames(gameElements);
    })()
  }, []);

  return (
    games && <div className="select-wrapper">
      <select onChange={(e) => {
        setGameType(e.target.value);
      }}>
        {games}
      </select>
    </div>
  );
}