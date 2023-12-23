import { useContext } from "react";
import AdminContext from "../context";

export default function NameInput({}) {
  const { sheetName, setSheetName } = useContext(AdminContext);

  return (
    <input
      type="text"
      value={ sheetName }
      onChange={ (e) => setSheetName(e.target.value) }
      placeholder="Sheet name"
    />
  );
}