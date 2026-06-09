import { useContext } from "react";
import { Square } from "../types";
import AdminContext, { NewContext } from "../context";
import { sendApiRequest } from "../lib/utilities";
import Trashcan from "./Trashcan";

interface Props {
	square: Square
	updateDeleted: () => void
};

export default function DeletedSquare( { square, updateDeleted }: Props ) {
	const { updateSquares, setUpdateSquares, deletedSquares, setDeletedSquares } = useContext<NewContext>( AdminContext );

	async function handleDelete() {
		const response = await sendApiRequest(
			'PATCH',
			'/squares',
			null,
			{ id: square._id, deleted: true }
		);

		if ( response.success ) {
			setUpdateSquares( updateSquares + 1 );
			updateDeleted();
		} else {
			console.error( response.message );
		}
	}

	async function handleRestore() {
		const response = await sendApiRequest(
			'PATCH',
			'/squares',
			null,
			{ id: square._id, active: true }
		);

		if ( response.success ) {
			setUpdateSquares( updateSquares + 1 );
			updateDeleted();
		} else {
			console.error( response.message );
		}
	}

	return (
		<li className="deleted-square" key={ square._id }>
			<span onClick={ handleDelete }>
				<Trashcan />
			</span>
			<button onClick={ handleRestore }>
				Restore
			</button>
			{ square.text }
		</li>
	);
}