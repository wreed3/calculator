import Big from "big.js";

export default function operate(numberOne, numberTwo, operation) {
  const one = Big(numberOne || "0");
  const two = Big(numberTwo || "0");
  
  if (operation === "+") {
    return one.plus(two).toString();
  }
  if (operation === "−") {
    return one.minus(two).toString();
  }
  if (operation === "×") {
    return one.times(two).toString();
  }
  if (operation === "÷") {
    if (two.eq(Big("0"))) {
      return "Error";
    }
    return one.div(two).toString();
  }
  if (operation === "xʸ") {
    // Use native Math.pow for power operation
    const result = Math.pow(parseFloat(numberOne), parseFloat(numberTwo));
    return String(result);
  }
  
  throw Error(`Unknown operation '${operation}'`);
}