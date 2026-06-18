import React from "react";
import "./Button.css";

export default class Button extends React.Component {
  handleClick = () => {
    this.props.clickHandler(this.props.name);
  };

  render() {
    const { name, text, className } = this.props;
    const displayText = text || name;
    const buttonClass = `component-button ${className || ""}`;

    return (
      <div className={buttonClass}>
        <button onClick={this.handleClick}>{displayText}</button>
      </div>
    );
  }
}