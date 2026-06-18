import React, { Component } from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import calculate from "../logic/calculate";
import "./App.css";

export default class App extends Component {
  state = {
    total: null,
    next: null,
    operation: null,
    angleMode: "deg", // 'deg' or 'rad'
    memory: 0,
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    const { key } = event;

    // Number keys
    if (/[0-9]/.test(key)) {
      this.handleClick(key);
      return;
    }

    // Operators
    const operatorMap = {
      "+": "+",
      "-": "−",
      "*": "×",
      "/": "÷",
      Enter: "=",
      Escape: "AC",
      ".": ".",
    };

    if (operatorMap[key]) {
      event.preventDefault();
      this.handleClick(operatorMap[key]);
    }
  };

  handleClick = (buttonName) => {
    const result = calculate(this.state, buttonName);
    this.setState(result);
  };

  render() {
    const { total, next, memory, angleMode } = this.state;
    const displayValue = next || total || "0";

    return (
      <div className="component-app">
        <Display
          value={displayValue}
          angleMode={angleMode}
          hasMemory={memory !== 0}
        />
        <ButtonPanel clickHandler={this.handleClick} angleMode={angleMode} />
      </div>
    );
  }
}