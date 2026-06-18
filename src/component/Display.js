import React from "react";
import "./Display.css";

export default class Display extends React.Component {
  render() {
    const { value, angleMode, hasMemory } = this.props;
    
    return (
      <div className="component-display">
        <div className="display-info">
          <span className="angle-mode">{angleMode ? angleMode.toUpperCase() : ""}</span>
          {hasMemory && <span className="memory-indicator">M</span>}
        </div>
        <div className="display-value">{value}</div>
      </div>
    );
  }
}