import Image from "next/image";

export default function GameHeader({ game = null }) {
  return (
    <>
      {!game && <div className="header"><h2>Loading...</h2></div>}
      {game &&
        <Image
          src={game.header}
          alt={game.name}
          width={500}
          height={105}
          className="header"
          priority
        />
      }
    </>
  );
}