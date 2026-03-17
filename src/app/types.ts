import { NextResponse } from "next/server"

export type ApiReturn<ResponseTypes = string> = Promise<NextResponse<ApiResponse<ResponseTypes>>>;

export interface ApiResponse<ResponseType = string> {
	success: boolean
	message: ResponseType
}