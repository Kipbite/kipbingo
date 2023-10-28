import { use } from "react";
import Grid from "./components/Grid";

async function getSheet() {
  return await fetch("http://localhost:3000/api/squares", {
    cache: "no-store",
  }).then((res) => res.json());
}

export default function Home({}) {
  const squares = use(getSheet());

  return (
    <main>
      <Grid squares={squares} />
    </main>
  )
}
