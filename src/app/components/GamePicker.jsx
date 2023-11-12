import { useContext, useEffect, useState } from "react";
import { sendApiRequest } from "../lib/utilities";
import AdminContext from "../context";

export default function GamePicker({}) {
  const [ games, setGames ] = useState();
  const { setGameType } = useContext(AdminContext);

  useEffect(() => {
    (async () => {
      const tempGames = await sendApiRequest('GET', '/games');
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
    games && <select onChange={(e) => {
      setGameType(e.target.value);
    }}>
      {games}
    </select>
  );
}