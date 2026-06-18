import React from "react";
import PropTypes from "prop-types";
import "./History.css";

export default class History extends React.Component {
  static propTypes = {
    history: PropTypes.arrayOf(
      PropTypes.shape({
        expression: PropTypes.string.isRequired,
        result: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
      })
    ).isRequired,
    onClear: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };

  formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };

  render() {
    const { history, onClear, onItemClick } = this.props;

    return (
      <div className="component-history" role="complementary" aria-label="Calculation history">
        <div className="history-header">
          <h2>History</h2>
          {history.length > 0 && (
            <button
              className="history-clear"
              onClick={onClear}
              aria-label="Clear calculation history"
            >
              Clear All
            </button>
          )}
        </div>
        
        <div className="history-list">
          {history.length === 0 ? (
            <div className="history-empty">
              <p>No calculations yet</p>
              <p className="history-empty-hint">Your calculation history will appear here</p>
            </div>
          ) : (
            history.map((item, index) => (
              <div
                key={item.timestamp}
                className="history-item"
                onClick={() => onItemClick(item.result)}
                role="button"
                tabIndex={0}
                aria-label={`Use result ${item.result} from ${item.expression}`}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onItemClick(item.result);
                  }
                }}
              >
                <div className="history-item-expression">{item.expression}</div>
                <div className="history-item-result">= {item.result}</div>
                <div className="history-item-time">{this.formatTimestamp(item.timestamp)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}