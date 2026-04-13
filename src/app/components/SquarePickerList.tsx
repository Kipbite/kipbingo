import { useContext, useState } from "react";
import AdminContext, { NewContext } from "../context";
import { sendApiRequest } from "../lib/utilities";
import NewSquarePicker from "./NewSquarePicker";
import DeletedSquares from "./DeletedSquares";
import { Square } from "../types";

export default function SquarePickerList() {
  const { squares, updateSquares, setUpdateSquares, gameType, setDeletedSquares } = useContext<NewContext>( AdminContext );
  const [ sure, setSure ] = useState( false );

  async function updateDeleted() {
    const response = await sendApiRequest<Square[]>(
      'GET',
      '/squares',
      {
        game: gameType,
        active: 'false'
      }
    );

    if ( response.success ) {
      setDeletedSquares( response.message );
    } else {
      alert( 'Something went wrong' );
    }
  };

  function handleDeleteAll() {
    if ( ! sure ) {
      setSure( true );
    } else {
      squares.forEach( async ( square ) => {
        const id = square.props.square._id;
        if ( ! id ) {
          console.error( 'Missing square ID' );
          return;
        }

        // TODO: Handle response properly
        const response = await sendApiRequest(
          'PATCH',
          '/squares',
          null,
          { id, active: false }
        );
      } );
      setUpdateSquares( updateSquares + 1 );
      setSure( false );
    }
  }

  return (
    <div className="possibilities">
      <div className="title">
        <h2>Options</h2>
        <button onClick={ handleDeleteAll }>
          <span>
            { sure ? 'Are you sure?' : 'Delete All' }
          </span>
        </button>
        {/* @ts-ignore */}
        <button command="show-modal" commandfor="deleted-squares" onClick={ updateDeleted }>
          Previously deleted
        </button>
      </div>
      <ul>
        { squares || 'Loading...' }
        <NewSquarePicker />
      </ul>

      <DeletedSquares updateDeleted={ updateDeleted } />
    </div>
  );
}
