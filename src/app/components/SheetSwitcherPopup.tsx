import { Dispatch } from "react";
import { Sheet } from "../types";
import SheetSwitcherOption from "./SheetSwitcherOption";
import CloseButton from "./CloseButton";

interface Props {
  sheets: Sheet[]
  selectedSheet: Sheet
}

export default function SheetSwitcherPopup( { sheets, selectedSheet }: Props ) {
  return (
    <dialog id="sheet-selector" closedby="any">
      <CloseButton command="close" commandfor="sheet-selector" />
      <h2>Pick a bingo sheet</h2>

      { sheets && sheets.map( sheet => 
        <SheetSwitcherOption
          key={ sheet._id }
          sheet={ sheet }
          active={ sheet._id === selectedSheet._id }
        />
      ) }
    </dialog>
  );
}