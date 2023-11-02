import { useContext } from "react";
import AdminContext from "../context";
import { saveSheet } from "../lib/utilities";

export default function SaveButton({}) {
  const { activeSquares, sheetName, gameType } = useContext(AdminContext);

  return (
    <button
      onClick={async () => {
        const response = await saveSheet({
          name: sheetName,
          game: gameType,
          squares: activeSquares,
        });
      }}
    >
      Save
    </button>
  );
}