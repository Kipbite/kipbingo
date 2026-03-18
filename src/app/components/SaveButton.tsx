
import { useContext } from "react";
import AdminContext, { NewContext } from "../context";
import { sendApiRequest } from "../lib/utilities";
import { useRouter } from "next/navigation";
import { Document, InsertOneResult } from "mongodb";

export default function SaveButton() {
  const router = useRouter();
  const { activeSquares, sheetName, gameType } = useContext<NewContext>( AdminContext );

  async function handleClick() {
    const response = await sendApiRequest<InsertOneResult<Document>>(
      'POST',
      '/sheets',
      null,
      { name: sheetName, game: gameType, squares: activeSquares }
    );

    if ( ! response.success ) {
      console.error( response.message );
    } else if (
      response.message.acknowledged &&
      response.message.insertedId
    ) {
      router.push(
        `/admin/play?sheetId=${ response.message.insertedId }`
      );
    }
  }

  return (
    <button onClick={ handleClick }>
      Save
    </button>
  );
}