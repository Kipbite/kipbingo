import { useContext } from "react";
import AdminContext, { NewContext } from "../context";
import DeletedSquare from "./DeletedSquare";
import CloseButton from "./CloseButton";

interface Props {
	updateDeleted: () => void
}

export default function DeletedSquares( { updateDeleted }: Props ) {
	const { deletedSquares, gameType } = useContext<NewContext>( AdminContext );

	if ( ! deletedSquares ) {
		return <div>Loading...</div>;
	}

	return (
		<dialog id="deleted-squares" closedby="any">
			{/* @ts-ignore */}
			<CloseButton commandFor="deleted-squares" command="close" />
			<h2>Deleted Squares</h2>
			<ul>
				{ deletedSquares.length < 1 && <div>
					No deleted squares for { gameType }
				</div> }
				{ deletedSquares.map( square => (
					<DeletedSquare square={ square } key={ square._id } updateDeleted={ updateDeleted } />
				) ) }
			</ul>
		</dialog>
	);
}