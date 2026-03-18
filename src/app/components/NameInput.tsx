import { useContext } from "react";
import AdminContext, { NewContext } from "../context";

export default function NameInput() {
  const { sheetName, setSheetName } = useContext<NewContext>( AdminContext );

  return (
    <input
      type="text"
      value={ sheetName }
      onChange={ e => setSheetName( e.target.value ) }
      placeholder="Sheet name"
    />
  );
}