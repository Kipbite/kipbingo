'use client'

import { useContext } from "react";
import AdminContext, { NewContext } from "../context";
import { sendApiRequest } from "../lib/utilities";
import CloseButton from "./CloseButton";

export default function DeleteAll() {
  const { squares, updateSquares, setUpdateSquares } = useContext<NewContext>( AdminContext );

	function handleDeleteAll() {
		squares.forEach( async ( square ) => {
			const id = square.props.square._id;
			if ( ! id ) {
				console.error( 'Missing square ID' );
				return;
			}

			const response = await sendApiRequest(
				'PATCH',
				'/squares',
				null,
				{ id, active: false }
			);

			if ( ! response.success ) {
				console.error( response.message );
				alert( 'Something went wrong' );
			}
		} );

		setUpdateSquares( updateSquares + 1 );
  }

	return (
		<dialog id="delete-all" closedby="any">
			<CloseButton command="close" commandfor="delete-all" />
			<h2>Are you sure you want to delete { squares?.length } options?</h2>
			<button onClick={ handleDeleteAll } className="confirm" command="close" commandfor="delete-all">
				Yes, delete them
			</button>
		</dialog>
	);
}