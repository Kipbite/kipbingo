import { NextResponse } from "next/server";

export async function GET( request ) {
  const md5 = require('md5');
  
  const { searchParams } = new URL(request.url);
  const submittedPassword = searchParams.get('password');

  const response = {
    success: submittedPassword === md5(process.env.ADMIN_PASSWORD)
  }

  return NextResponse.json(response);
}