import { createContext, Dispatch } from 'react';
import { Grid, GridRef, Sheet, Square } from './types';
import EditableGridSquare from './components/EditableGridSquare';

export interface HomepageContext {
	isAdmin: false
	setSheet: Dispatch<Sheet>
	goldenSquares: GridRef[]
	setGoldenSquares?: Dispatch<GridRef[]>
}

export interface NewContext {
	isAdmin: true
	squares: ReturnType<typeof EditableGridSquare>[]
	setSquares: Dispatch<ReturnType<typeof EditableGridSquare>[]>
	activeSquares: Grid
	setActiveSquares: Dispatch<Grid>
	draggedSquare: Square
	setDraggedSquare: Dispatch<Square>
	sheetName: string
	setSheetName: Dispatch<string>
	gameType: string
	setGameType: Dispatch<string>
	updateSquares: number
	setUpdateSquares: Dispatch<number>
}

export interface PlayContext {
	isAdmin: true
	sheet: Sheet
	setSheet: Dispatch<Sheet>
	squares: Grid
	setSquares: Dispatch<Grid>
	draggedSquare: Square
	setDraggedSquare: Dispatch<Square>
	goldenSquares: GridRef[]
	setGoldenSquares?: Dispatch<GridRef[]>
}

type AdminContextOptions = HomepageContext | NewContext | PlayContext;

const AdminContext = createContext<AdminContextOptions>( null );
export default AdminContext;
