import { ObjectId } from "mongodb";
import { ReactNode } from "react";

export type ChildElement = ReactNode | ReactNode[];

export interface ApiResponse<T = unknown> {
	success: boolean
	message: T
}

export type ApiMethod = 'GET'|'POST'|'PATCH'|'DELETE';

export type GridRef = 'A0'|'A1'|'A2'|'A3'|'A4'|'B0'|'B1'|'B2'|'B3'|'B4'|'C0'|'C1'|'C2'|'C3'|'C4'|'D0'|'D1'|'D2'|'D3'|'D4'|'E0'|'E1'|'E2'|'E3'|'E4';

export type Grid = Record<GridRef, Square>;

export interface Square {
	_id: string
	text: string
	game: string
	active: boolean
	ticked: boolean
	gridRef?: GridRef
}

export interface LightweightSquare {
	id: string
	ticked: boolean
}

export interface Sheet {
	_id: string
	squares: Record<GridRef, LightweightSquare>
}

export interface Game {
	_id: string
	name: string
	header: `https://${ string }.${ 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp' }`
}