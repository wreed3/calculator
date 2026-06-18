import Big from "big.js";
import operate from "./operate";
import isNumber from "./isNumber";

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 *   angleMode:String  'deg' or 'rad'
 *   memory:Number     memory storage
 */
export default function calculate(obj, buttonName) {
  // Handle angle mode toggle
  if (buttonName === "angleMode") {
    return {
      ...obj,
      angleMode: obj.angleMode === "deg" ? "rad" : "deg",
    };
  }

  // Handle memory operations
  if (buttonName === "MC") {
    return { ...obj, memory: 0 };
  }

  if (buttonName === "MR") {
    return {
      ...obj,
      next: String(obj.memory),
    };
  }

  if (buttonName === "M+") {
    const currentValue = obj.next || obj.total || "0";
    return {
      ...obj,
      memory: obj.memory + parseFloat(currentValue),
    };
  }

  // Handle scientific functions that operate on current display value
  const scientificFunctions = [
    "sin",
    "cos",
    "tan",
    "log",
    "ln",
    "√",
    "x²",
    "x³",
    "!",
    "1/x",
    "eˣ",
  ];

  if (scientificFunctions.includes(buttonName)) {
    const currentValue = obj.next || obj.total || "0";
    try {
      const result = performScientificOperation(
        buttonName,
        parseFloat(currentValue),
        obj.angleMode
      );

      if (isNaN(result) || !isFinite(result)) {
        return { ...obj, next: "Error", total: null, operation: null };
      }

      // Format result to prevent overflow
      const formattedResult = formatResult(result);

      return {
        ...obj,
        next: formattedResult,
        total: null,
        operation: null,
      };
    } catch (error) {
      return { ...obj, next: "Error", total: null, operation: null };
    }
  }

  // Handle constants
  if (buttonName === "π") {
    return {
      ...obj,
      next: String(Math.PI),
    };
  }

  if (buttonName === "e") {
    return {
      ...obj,
      next: String(Math.E),
    };
  }

  // Handle power operation (needs two operands)
  if (buttonName === "xʸ") {
    if (obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: "xʸ",
      };
    }

    if (!obj.next) {
      return obj;
    }

    return {
      total: obj.next,
      next: null,
      operation: "xʸ",
    };
  }

  // Original calculator logic below
  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null,
      angleMode: obj.angleMode,
      memory: obj.memory,
    };
  }

  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return {};
    }

    if (obj.operation) {
      if (obj.next) {
        return { next: obj.next + buttonName };
      }
      return { next: buttonName };
    }

    if (obj.next) {
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      return {
        next,
        total: null,
      };
    }
    return {
      next: buttonName,
      total: null,
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: Big(result).div(Big("100")).toString(),
        next: null,
        operation: null,
      };
    }
    if (obj.next) {
      return {
        next: Big(obj.next).div(Big("100")).toString(),
      };
    }
    return {};
  }

  if (buttonName === ".") {
    if (obj.next) {
      if (obj.next.includes(".")) {
        return {};
      }
      return { next: obj.next + "." };
    }
    if (obj.operation) {
      return { next: "0." };
    }
    if (obj.total) {
      if (obj.total.includes(".")) {
        return {};
      }
      return { total: obj.total + "." };
    }
    return { total: "0." };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null,
      };
    } else {
      return {};
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {};
  }

  // Button must be an operation

  // When the user presses an operation button without having entered
  // a number first, do nothing.
  // if (!obj.next && !obj.total) {
  //   return {};
  // }

  // User pressed an operation button and there is an existing operation
  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName,
    };
  }

  // no operation yet, but the user typed one

  // The user hasn't typed a number yet, just save the operation
  if (!obj.next) {
    return { operation: buttonName };
  }

  // save the operation and shift 'next' into 'total'
  return {
    total: obj.next,
    next: null,
    operation: buttonName,
  };
}

function performScientificOperation(operation, value, angleMode) {
  switch (operation) {
    case "sin":
      return angleMode === "deg"
        ? Math.sin((value * Math.PI) / 180)
        : Math.sin(value);
    case "cos":
      return angleMode === "deg"
        ? Math.cos((value * Math.PI) / 180)
        : Math.cos(value);
    case "tan":
      return angleMode === "deg"
        ? Math.tan((value * Math.PI) / 180)
        : Math.tan(value);
    case "log":
      return Math.log10(value);
    case "ln":
      return Math.log(value);
    case "√":
      return Math.sqrt(value);
    case "x²":
      return Math.pow(value, 2);
    case "x³":
      return Math.pow(value, 3);
    case "eˣ":
      return Math.exp(value);
    case "!":
      return factorial(value);
    case "1/x":
      return 1 / value;
    default:
      return value;
  }
}

function factorial(n) {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // Prevent overflow
  if (n !== Math.floor(n)) return NaN; // Only integers

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function formatResult(result) {
  // Handle very small numbers
  if (Math.abs(result) < 1e-10 && result !== 0) {
    return result.toExponential(6);
  }

  // Handle very large numbers
  if (Math.abs(result) > 1e10) {
    return result.toExponential(6);
  }

  // Format to reasonable precision
  const formatted = parseFloat(result.toPrecision(12));
  return String(formatted);
}