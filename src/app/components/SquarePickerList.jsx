import { useContext, useState } from "react";
import AdminContext from "../context";
import NewSquarePicker from "./NewSquarePicker";
import { sendApiRequest } from "../lib/utilities";

export default function SquarePickerList({ game }) {
  const { squares, updateSquares, setUpdateSquares } = useContext( AdminContext );
  const [ sure, setSure ] = useState( false );

  return (
    <div className="possibilities">
      <div className="title">
        <h2>Options</h2>
        <button onClick={() => {
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
        }}>
          <span>{ sure ? "Are you sure?" : "Delete All" }</span>
        </button>
      </div>
      <ul>
        {squares || "Loading..."}
        <NewSquarePicker />
      </ul>
    </div>
  );
}
