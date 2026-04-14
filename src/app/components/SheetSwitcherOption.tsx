import { useContext, useState } from "react";
import { sendApiRequest } from "../lib/utilities";
import AdminContext, { HomepageContext, PlayContext } from "../context";
import Trashcan from "./Trashcan";
import { Sheet } from "../types";
import { DeleteResult } from "mongodb";

export default function SheetSwitcherOption({ sheet, active }) {
  const { setSheet, isAdmin } = useContext<PlayContext|HomepageContext>( AdminContext );
  const [ deleted, setDeleted ] = useState( false );

  async function handleDelete() {
    const response = await sendApiRequest<DeleteResult>(
      'DELETE',
      '/sheets',
      { id: sheet._id }
    );

    if ( ! response.success ) {
      console.error( response.message );
      return;
    }

    setDeleted( true );
  }

  async function handleSelect() {
    setSheet( null );

    const response = await sendApiRequest<Sheet>(
      'GET',
      '/sheets/unfolded',
      { sheetId: sheet._id }
    );

    if ( ! response.success ) {
      console.error( `Error fetching unfolded sheets: ${ response.message }` );
      return;
    }

    setSheet( response.message );
  }

  return ( ! deleted &&
    <div className={ `sheet-switcher-option ${ active ? 'active' : '' }` } onClick={ handleSelect }>
      <span>
        { sheet.name }
      </span>

      { isAdmin &&
        <span onClick={ handleDelete }>
          <Trashcan />
        </span>
      }
    </div>
  )
}