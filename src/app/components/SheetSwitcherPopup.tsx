import { Dispatch } from "react";
import { Sheet } from "../types";
import SheetSwitcherOption from "./SheetSwitcherOption";
import CloseButton from "./CloseButton";

interface Props {
  sheets: Sheet[]
  selectedSheet: Sheet
  setSelectorOpen: Dispatch<boolean>
}

export default function SheetSwitcherPopup( {
  sheets,
  selectedSheet,
  setSelectorOpen
}: Props ) {
  return (
    <div className="sheet-selector">
      <CloseButton onClick={ () => { setSelectorOpen( false ) } }/>

      { sheets.map( sheet => 
        <SheetSwitcherOption
          key={ sheet._id }
          sheet={ sheet }
          active={ sheet._id === selectedSheet._id }
        />
      ) }
    </div>
  );
}