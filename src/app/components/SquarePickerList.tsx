import { useContext, useState } from "react";
import AdminContext, { NewContext } from "../context";
import NewSquarePicker from "./NewSquarePicker";
import { sendApiRequest } from "../lib/utilities";

export default function SquarePickerList() {
  const { squares, updateSquares, setUpdateSquares } = useContext<NewContext>( AdminContext );
  const [ sure, setSure ] = useState( false );

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
      </div>
      <ul>
        { squares || 'Loading...' }
        <NewSquarePicker />
      </ul>
    </div>
  );
}
