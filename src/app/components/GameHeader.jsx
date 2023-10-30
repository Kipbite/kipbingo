import Image from "next/image";

export default function GameHeader({ game }) {
  
  return (
    <Image
      src={game.header}
      alt={game.name}
      width={500}
      height={105}
      className="header"
      priority
    />
  );
}