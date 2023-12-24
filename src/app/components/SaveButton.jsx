
import { useContext } from "react";
import AdminContext from "../context";
import { sendApiRequest } from "../lib/utilities";
import { useRouter } from "next/navigation";

export default function SaveButton({}) {
  const router = useRouter();
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

        if (response.acknowledged && response.insertedId) {
          console.log(`/admin/play?sheetId=${response.insertedId}`);
          router.push(`/admin/play?sheetId=${response.insertedId}`);
        }
      }}
    >
      Save
    </button>
  );
}