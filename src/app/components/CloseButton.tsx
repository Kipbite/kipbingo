interface Props {
	onClick: ( e?: React.MouseEvent<HTMLButtonElement> ) => void
};

export default function CloseButton( { onClick }: Props ) {
	return (
		<button onClick={ onClick } className="close-button">
			X
		</button>
	);
}