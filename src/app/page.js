import { use } from "react";

async function getSheet() {
  return await fetch("http://localhost:3000/api/squares", {
    cache: "no-store",
  }).then((res) => res.json());
}


export default function Home({}) {
  const { data } = use(getSheet());
  const { rows } = data;

  let i = 0;

  return (
    <main>
      {rows.map((row) => {
        i++;
        return(
        <div key={`row-${i}`}>
          <br />
          {row.map((square) => {
            return <span key={square}> {square} </span>
          })}
        </div>
)      })}
    </main>
  )
}
