/**
 * This is just a wrapper for `button`. It's a slightly
 * janky way of getting around the fact that React hasn't
 * updated yet to include command/commandFor on buttons
 */

export default function Button( props ) {
	return (
		<button { ...props } />
	);
}