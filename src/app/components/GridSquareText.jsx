import FreeSpace from "./FreeSpace";

export default function GridSquareText({ text }) {
  return text === 'free-space' ? <FreeSpace /> : text;
}