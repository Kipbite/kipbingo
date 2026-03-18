"use client"

import { useEffect, useState } from "react";
import { sendApiRequest } from "../lib/utilities";
import SheetSwitcherPopup from "./SheetSwitcherPopup";
import { Sheet } from "../types";

export default function SheetSwitcher({ sheet }) {
  const [ sheetList, setSheetList ] = useState<Sheet[]>();
  const [ selectorOpen, setSelectorOpen ] = useState( false );

  useEffect(() => {
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
    } )()
  }, [] );

  return (
    <>
      <div className='sheet-name' onClick={ () => {
        if ( sheetList ) {
          setSelectorOpen( ! selectorOpen );
        }
      } }>
        <h2>
          { sheet.name || 'Loading...' }
        </h2>
      </div>

      { selectorOpen && sheetList &&
        <SheetSwitcherPopup
          sheets={ sheetList }
          selectedSheet={ sheet }
          setSelectorOpen={ setSelectorOpen }
        />
      }
    </>
  );
}