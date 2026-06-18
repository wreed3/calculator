import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

export default class Button extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    orange: PropTypes.bool,
    wide: PropTypes.bool,
    clickHandler: PropTypes.func.isRequired,
  };

  handleClick = () => {
    this.props.clickHandler(this.props.name);
  };

  render() {
    const { name, orange, wide } = this.props;
    const className = [
      "component-button",
      orange ? "orange" : "",
      wide ? "wide" : "",
    ]
      .filter(Boolean)
      .join(" ");

    // Determine appropriate aria-label
    const ariaLabel = {
      "AC": "All Clear",
      "CE": "Clear Entry", 
      "+/-": "Plus Minus",
      "%": "Percent",
      "÷": "Divide",
      "×": "Multiply",
      "-": "Subtract",
      "+": "Add",
      "=": "Equals",
      ".": "Decimal point",
    }[name] || `Number ${name}`;

    return (
      <div
        className={className}
        onClick={this.handleClick}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            this.handleClick();
          }
        }}
      >
        {name}
      </div>
    );
  }
}