import { NextRequest } from "next/server";
import unfoldedSheetsEndpointGet from "./GET";

export async function GET( request: NextRequest ) {
  return await unfoldedSheetsEndpointGet( request );
}
