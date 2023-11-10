import SheetSwitcherOption from "./SheetSwitcherOption";

export default function SheetSwitcherPopup({ sheets, selectedSheet, setSelectorOpen }) {
  return (
    <div className="sheet-selector">
      <button
        onClick={() => { setSelectorOpen(false) }}
        className="close-button"
      >
        X
      </button>

      {sheets.map((sheet) => {
        return (
          <SheetSwitcherOption
            key={sheet._id}
            sheet={sheet}
            active={sheet._id === selectedSheet._id}
          />
        )
      })}
    </div>
  );
}