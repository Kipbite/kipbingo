import { useContext } from "react";
import AdminContext, { NewContext } from "../context";
import { sendApiRequest } from "../lib/utilities";
import NewSquarePicker from "./NewSquarePicker";
import DeletedSquares from "./DeletedSquares";
import { Square } from "../types";
import DeleteAll from "./DeleteAll";
import Button from "./Button";

export default function SquarePickerList() {
  const { squares, gameType, setDeletedSquares } = useContext<NewContext>( AdminContext );

  async function updateDeleted() {
    const response = await sendApiRequest<Square[]>(
      'GET',
      '/squares',
      {
        game: gameType,
        active: 'false',
        deleted: '{"$ne": true}',
      }
    );

    if ( response.success ) {
      setDeletedSquares( response.message );
    } else {
      alert( 'Something went wrong' );
    }
  };

  return (
    <div className="possibilities">
      <div className="title">
        <h2>Options</h2>
        <Button command="show-modal" commandfor="deleted-squares" onClick={ updateDeleted }>
          Previously deleted
        </Button>
        <Button command="show-modal" commandfor="delete-all">
          <span>
            Delete All
          </span>
        </Button>
      </div>
      <ul>
        { squares || 'Loading...' }
        <NewSquarePicker />
      </ul>
      <DeletedSquares updateDeleted={ updateDeleted } />
      <DeleteAll />
    </div>
  );
}
