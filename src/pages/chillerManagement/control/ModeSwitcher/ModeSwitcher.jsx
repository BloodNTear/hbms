import React, { useState } from "react";
import "./ModeSwitcher.css";

function ModeSwitcher({currentMode, onModeSwitch}) {

  function handleModeSwitch(){
    const newMode = currentMode === 1 ? 0 : 1;
    onModeSwitch && onModeSwitch(newMode);
  }

  return (
    <div className="mode-card">
      <h2 className="mode-title">Mode Selector</h2>

      <div className="mode-toggle">
        <button
          className={`mode-btn ${currentMode === 1 ? "active" : ""}`}
          onClick={handleModeSwitch}
        >
          Auto
        </button>
        <button
          className={`mode-btn ${currentMode === 0 ? "active" : ""}`}
          onClick={handleModeSwitch}
        >
          Manual
        </button>
      </div>

      <div className="mode-description">
        {currentMode === 1 ? (
          <>
            <h3>Automatic Mode</h3>
          </>
        ) : (
          <>
            <h3>Manual Mode</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default ModeSwitcher;
