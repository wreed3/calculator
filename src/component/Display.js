import React from "react";
import PropTypes from "prop-types";
import "./Display.css";

export default class Display extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    expression: PropTypes.string,
  };

  static defaultProps = {
    expression: "",
  };

  formatNumber = (value) => {
    // Add thousand separators for better readability
    const parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  render() {
    const { value, expression } = this.props;
    const displayValue = this.formatNumber(value);

    return (
      <div className="component-display" role="region" aria-label="Calculator display">
        <div className="display-expression" aria-label="Current expression">
          {expression || "\u00A0"}
        </div>
        <div className="display-value" aria-live="polite" aria-atomic="true">
          {displayValue}
        </div>
      </div>
    );
  }
}