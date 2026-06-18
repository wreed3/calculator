import React from "react";
import Display from "./Display";
import ButtonPanel from "./ButtonPanel";
import History from "./History";
import calculate from "../logic/calculate";
import "./App.css";

class App extends React.Component {
  state = {
    total: null,
    next: null,
    operation: null,
    expression: "",
    history: JSON.parse(localStorage.getItem("calcHistory")) || [],
    theme: localStorage.getItem("calcTheme") || "light",
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.body.className = this.state.theme;
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (event) => {
    const key = event.key;
    
    // Prevent default for calculator keys
    if (/^[0-9+\-*/.=]$/.test(key) || key === "Enter" || key === "Escape" || key === "Backspace") {
      event.preventDefault();
    }

    // Number keys
    if (/^[0-9.]$/.test(key)) {
      this.handleButton(key);
    }
    // Operator keys
    else if (key === "+" || key === "-" || key === "*" || key === "/") {
      const operatorMap = { "+": "+", "-": "-", "*": "×", "/": "÷" };
      this.handleButton(operatorMap[key]);
    }
    // Enter or equals
    else if (key === "Enter" || key === "=") {
      this.handleButton("=");
    }
    // Escape for clear
    else if (key === "Escape") {
      this.handleButton("AC");
    }
    // Backspace for delete
    else if (key === "Backspace") {
      this.handleButton("CE");
    }
    // Percent
    else if (key === "%") {
      this.handleButton("%");
    }
  };

  buildExpression = (obj) => {
    const { total, operation, next } = obj;
    let expr = "";
    
    if (total) {
      expr += total;
    }
    if (operation) {
      expr += ` ${operation} `;
    }
    if (next) {
      expr += next;
    }
    
    return expr;
  };

  handleButton = (buttonName) => {
    const currentExpression = this.buildExpression(this.state);
    const result = calculate(this.state, buttonName);
    
    // If calculation was completed (equals pressed), add to history
    if (buttonName === "=" && result.total && !result.next && !result.operation) {
      const historyItem = {
        expression: currentExpression,
        result: result.total,
        timestamp: Date.now(),
      };
      
      const newHistory = [historyItem, ...this.state.history].slice(0, 50); // Keep last 50
      localStorage.setItem("calcHistory", JSON.stringify(newHistory));
      
      this.setState({
        ...result,
        expression: "",
        history: newHistory,
      });
    } else {
      this.setState({
        ...result,
        expression: this.buildExpression(result),
      });
    }
  };

  handleClearHistory = () => {
    localStorage.removeItem("calcHistory");
    this.setState({ history: [] });
  };

  handleHistoryItemClick = (value) => {
    this.setState({
      total: value,
      next: null,
      operation: null,
      expression: value,
    });
  };

  toggleTheme = () => {
    const newTheme = this.state.theme === "light" ? "dark" : "light";
    localStorage.setItem("calcTheme", newTheme);
    document.body.className = newTheme;
    this.setState({ theme: newTheme });
  };

  render() {
    return (
      <div className="app-container">
        <div className="component-app">
          <div className="calculator-header">
            <h1>Calculator</h1>
            <button 
              className="theme-toggle"
              onClick={this.toggleTheme}
              aria-label={`Switch to ${this.state.theme === "light" ? "dark" : "light"} mode`}
            >
              {this.state.theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
          <Display 
            value={this.state.next || this.state.total || "0"} 
            expression={this.state.expression}
          />
          <ButtonPanel clickHandler={this.handleButton} />
          <div className="keyboard-hint">
            Keyboard shortcuts: Numbers, +, -, *, /, Enter (=), Esc (clear), Backspace (delete)
          </div>
        </div>
        <History 
          history={this.state.history}
          onClear={this.handleClearHistory}
          onItemClick={this.handleHistoryItemClick}
        />
      </div>
    );
  }
}

export default App;