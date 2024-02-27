import { NextResponse } from "next/server";

export async function POST( request ) {
  const body = await request.json();
  const formBody = `data=${JSON.stringify(body)}`;

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
    .then((res) => {
      return NextResponse.json({
        success: true
      });
    })
    .catch((e) => {
      return NextResponse.json({
        error: e
      });
    })
}