import { useContext } from "react";
import AdminContext from "../context";
import { sendApiRequest } from "../lib/utilities";

export default function SaveButton({}) {
  const { activeSquares, sheetName, gameType } = useContext(AdminContext);

  return (
    <button
      onClick={async () => {
        const response = await sendApiRequest(
          'POST',
          '/sheets',
          null,
          {
            name: sheetName,
            game: gameType,
            squares: activeSquares,
          }
        );

        // TODO: Handle response properly
        console.log(response);
      }}
    >
      Save
    </button>
  );
}