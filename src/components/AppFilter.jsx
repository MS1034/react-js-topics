import React, { useState } from "react";
import { TopicAPI } from "../api/TopicAPI";

function AppFilter({ onVisibilityChange, handleHideButtonClick, isSelected }) {
  const [isShown, setIsShown] = useState(true);

  return (
    <div className="form-group">
      <label htmlFor="visibility">Choose visibility</label>
      <div className="d-flex flex-row mb-3">
        <select
          className="form-select col-sm"
          name="visibility"
          id="visibility-dropdown"
          onChange={(event) => {
            const isVisible = event.target.value == "hide" ? false : true;
            onVisibilityChange(isVisible);
            setIsShown(isVisible);
          }}
        >
          <option value="show" defaultValue="">
            Show
          </option>
          <option value="hide">Hide</option>
        </select>

        <button
          id="prev-button"
          className="btn btn-secondary col-sm"
          disabled={isSelected}
          onClick={() => handleHideButtonClick(!isShown)}
        >
          {isShown ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default AppFilter;
