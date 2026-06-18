import React from "react";
import Button from "./Button";
import "./ButtonPanel.css";

export default class ButtonPanel extends React.Component {
  handleClick = (buttonName) => {
    this.props.clickHandler(buttonName);
  };

  render() {
    const { angleMode } = this.props;
    
    return (
      <div className="component-button-panel">
        {/* Mode and Memory Row */}
        <div className="button-row">
          <Button
            name="angleMode"
            text={angleMode.toUpperCase()}
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="MC"
            clickHandler={this.handleClick}
            className="memory-button"
          />
          <Button
            name="MR"
            clickHandler={this.handleClick}
            className="memory-button"
          />
          <Button
            name="M+"
            clickHandler={this.handleClick}
            className="memory-button"
          />
          <Button
            name="AC"
            clickHandler={this.handleClick}
            className="clear-button"
          />
        </div>

        {/* Scientific Functions Row 1 */}
        <div className="button-row">
          <Button
            name="sin"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="cos"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="tan"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="π"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="e"
            clickHandler={this.handleClick}
            className="function-button"
          />
        </div>

        {/* Scientific Functions Row 2 */}
        <div className="button-row">
          <Button
            name="x²"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="x³"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="xʸ"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="√"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="!"
            clickHandler={this.handleClick}
            className="function-button"
          />
        </div>

        {/* Scientific Functions Row 3 */}
        <div className="button-row">
          <Button
            name="log"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="ln"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="eˣ"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="1/x"
            clickHandler={this.handleClick}
            className="function-button"
          />
          <Button
            name="+/-"
            clickHandler={this.handleClick}
            className="function-button"
          />
        </div>

        {/* Number Pad */}
        <div className="button-row">
          <Button name="7" clickHandler={this.handleClick} />
          <Button name="8" clickHandler={this.handleClick} />
          <Button name="9" clickHandler={this.handleClick} />
          <Button
            name="÷"
            clickHandler={this.handleClick}
            className="operator-button"
          />
        </div>

        <div className="button-row">
          <Button name="4" clickHandler={this.handleClick} />
          <Button name="5" clickHandler={this.handleClick} />
          <Button name="6" clickHandler={this.handleClick} />
          <Button
            name="×"
            clickHandler={this.handleClick}
            className="operator-button"
          />
        </div>

        <div className="button-row">
          <Button name="1" clickHandler={this.handleClick} />
          <Button name="2" clickHandler={this.handleClick} />
          <Button name="3" clickHandler={this.handleClick} />
          <Button
            name="−"
            clickHandler={this.handleClick}
            className="operator-button"
          />
        </div>

        <div className="button-row">
          <Button name="0" clickHandler={this.handleClick} />
          <Button name="." clickHandler={this.handleClick} />
          <Button
            name="="
            clickHandler={this.handleClick}
            className="equals-button"
          />
          <Button
            name="+"
            clickHandler={this.handleClick}
            className="operator-button"
          />
        </div>
      </div>
    );
  }
}