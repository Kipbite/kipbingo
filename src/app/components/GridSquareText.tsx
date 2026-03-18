import FreeSpace from "./FreeSpace";
import useFitText from "use-fit-text";

interface Props {
  text: string
}

export default function GridSquareText( { text }: Props ) {
  const { fontSize, ref } = useFitText();

  if ( text === 'free-space' ) {
    return <FreeSpace />
  }

  return (
    <span ref={ ref } style={ { fontSize } } className='cell-text' >
      { text }
    </span>
  )
}