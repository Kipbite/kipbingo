import { useContext } from "react";
import AdminContext from "../context";
import { saveSheet } from "../lib/utilities";

export default function SaveButton({}) {
  const { activeSquares, sheetName, game } = useContext(AdminContext);

  return (
    <button
      onClick={async () => {
        const response = await saveSheet({
          name: sheetName,
          game: game.name,
          squares: activeSquares,
        });

        console.log(response);
      }}
    >
      Save
    </button>
  );
}