import FreeSpace from "./FreeSpace";
import useFitText from "use-fit-text";

export default function GridSquareText({ text }) {
  const { fontSize, ref } = useFitText();

  if (text === 'free-space') {
    return <FreeSpace />
  }

  return (
    <span
      ref={ref}
      style={{ fontSize }}
      className="cell-text"
    >
      {text}
    </span>
  )
}