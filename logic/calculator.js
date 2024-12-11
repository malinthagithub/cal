//IM/2021/053
//N.W.I.M.prasan
export const initialState = {
  currentValue: "0", // The value displayed on the calculator
  operator: null, // The current operator (+, -, *, /)
  previousValue: null, // The value before the operator
  expression: "", // The full expression as a string
  operatorClicked: false, // Flag to track if an operator was clicked
  parentheses: 0, // Tracks parentheses count for balanced expressions
};

const handleNumber = (value, state) => {
  const isStartingNewNumber = state.currentValue === "0" || state.operatorClicked;

  return {
    ...state,
    currentValue: isStartingNewNumber ? `${value}` : `${state.currentValue}${value}`,
    expression: state.expression === "" ? `${value}` : `${state.expression}${value}`,
    operatorClicked: false, // Reset operator flag when typing a number
  };
};

const handleOperator = (value, state) => {
  if (state.operatorClicked) {
    // If an operator was clicked already, replace it with the new one
    return {
      ...state,
      operator: value,
      expression: `${state.expression.slice(0, -1)}${value}`,
    };
  }

  // Otherwise, store the current value as the previous value and reset the display for the next number
  return {
    ...state,
    operator: value,
    previousValue: state.currentValue,
    currentValue: "0",
    expression: `${state.expression}${value}`,
    operatorClicked: true, // Flag to indicate an operator has been clicked
  };
};

const evaluateExpression = (expression) => {
  try {
    // Explicitly check for division by zero cases
    if (/\/0(?![0-9])/.test(expression) || expression === "0/0") {
      return "cannot divide by zero"; // Handle division by zero
    }

    // Evaluate the expression safely
    const result = new Function("return " + expression)();
    return result;
  } catch (error) {
    return "Error"; // Return error for invalid expressions
  }
};

const handleEqual = (state) => {
  const result = evaluateExpression(state.expression);

  if (result === "cannot divide by zero") {
    // Special handling for division by zero
    return {
      ...state,
      currentValue: "cannot divide by zero", // Display error message
      expression: "cannot divide by zero", // Completely hide the expression
      operator: null,
      previousValue: null,
      operatorClicked: false,
    };
  }

  if (result === Infinity || result === -Infinity || isNaN(result)) {
    // Catch any cases where the result is invalid
    return {
      ...state,
      currentValue: "Error", // Display a generic error message
      expression: "", // Completely hide the expression
    };
  }

  return {
    ...state,
    currentValue: `${result}`, // Display the result
    expression: `${state.expression}=${result}`, // Update the expression with the result
    operator: null,
    previousValue: null,
    operatorClicked: false,
  };
};

const handleClear = () => {
  return { ...initialState }; // Reset to initial state
};

const handleBackspace = (state) => {
  if (state.currentValue.length > 1) {
    return {
      ...state,
      currentValue: state.currentValue.slice(0, -1), // Remove last character from current value
      expression: state.expression.slice(0, -1), // Remove last character from expression
    };
  }

  return { ...state, currentValue: "0", expression: "" }; // Reset if only one character remains
};

const handlePercent = (state) => {
  const { currentValue } = state;
  const current = parseFloat(currentValue);

  if (isNaN(current)) return state; // Do nothing if currentValue is not a number

  const result = current / 100;

  return {
    ...state,
    currentValue: `${result}`, // Show percentage value
    expression: `${state.expression}%`, // Update expression with percentage sign
  };
};

const handleParentheses = (state) => {
  const { parentheses, expression } = state;

  // Add open or close parentheses based on current state
  const newExpression =
    parentheses > 0 && /[0-9)]$/.test(expression)
      ? `${expression})` // Add closing parenthesis if needed
      : `${expression}(`; // Add opening parenthesis otherwise

  const newParentheses =
    parentheses > 0 && /[0-9)]$/.test(expression)
      ? parentheses - 1
      : parentheses + 1;

  return {
    ...state,
    expression: newExpression, // Update the expression with parentheses
    parentheses: newParentheses, // Update the parentheses counter
  };
};

const calculator = (type, value, state) => {
  switch (type) {
    case "number":
      return handleNumber(value, state);
    case "clear":
      return handleClear();
    case "operator":
      return handleOperator(value, state);
    case "equal":
      return handleEqual(state);
    case "backspace":
      return handleBackspace(state);
    case "percent":
      return handlePercent(state);
    case "parentheses":
      return handleParentheses(state);
    default:
      return state; // Return the current state if no valid action is matched
  }
};

export default calculator;
