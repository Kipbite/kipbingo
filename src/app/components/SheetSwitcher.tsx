"use client"

import { useEffect, useState } from "react";
import { sendApiRequest } from "../lib/utilities";
import SheetSwitcherPopup from "./SheetSwitcherPopup";
import { Sheet } from "../types";
import Button from "./Button";

interface Props {
  sheet: Sheet
}

export default function SheetSwitcher( { sheet }: Props ) {
  const [ sheetList, setSheetList ] = useState<Sheet[]>();

  if ( ! sheetList ) {
    ( async () => {
      const response = await sendApiRequest<Sheet[]>(
        'GET',
        '/sheets',
        { limit: '20' }
      );
  
      if ( ! response ) {
        console.error( 'Error fetching sheets: No response from /sheets API endpoint' );
        return;
      }
  
      if ( ! response.success ) {
        console.error( `Error fetching sheets: ${ response.message }`);
        return;
      }
  
      const sheets = response.message;
      setSheetList( sheets );
    } )();
  }

  return (
    <>
      <Button className='sheet-name' command="show-modal" commandfor="sheet-selector">
        <h2>
          { sheet.name || 'Loading...' }
        </h2>
      </Button>

      <SheetSwitcherPopup
        sheets={ sheetList }
        selectedSheet={ sheet }
      />
    </>
  );
}