import { apiFail, apiSuccess } from "@/app/lib/utilities";
import { NextRequest } from "next/server";

export default async function POST( request: NextRequest ) {
  const body = await request.json();
  const formBody = `data=${ JSON.stringify( body ) }`;

  return await fetch(
    process.env.NEXT_PUBLIC_MIXITUP_WEBHOOK_URL,
    {
      cache: "no-store",
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }
  )
    .then( apiSuccess )
    .catch( apiFail );
}