// ---- State ----
let current = "0";        // number being typed (string)
let previous = null;      // stored left-hand value (number)
let operator = null;      // "+", "−", "×", "÷"
let freshEntry = true;    // next digit starts a new number
let justEvaluated = false;
let hasError = false;

const valueEl = document.getElementById("value");
const exprEl = document.getElementById("expression");
const opButtons = document.querySelectorAll('button[data-action="operator"]');

// ---- Math (no eval) ----
function calculate(a, op, b) {
  let result;
  switch (op) {
    case "+": result = a + b; break;
    case "−": result = a - b; break;
    case "×": result = a * b; break;
    case "÷":
      if (b === 0) return null; // division by zero
      result = a / b;
      break;
    default: return b;
  }
  // trim floating-point noise (0.1 + 0.2)
  return parseFloat(result.toPrecision(12));
}

function formatNumber(n) {
  if (typeof n === "string") return n;
  const abs = Math.abs(n);
  if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) return n.toExponential(6).replace(/\.?0+e/, "e");
  return String(n);
}

// ---- Display ----
function render() {
  valueEl.textContent = current;
  valueEl.classList.remove("small", "xsmall");
  valueEl.classList.toggle("error", hasError);
  if (!hasError) {
    if (current.length > 14) valueEl.classList.add("xsmall");
    else if (current.length > 9) valueEl.classList.add("small");
  }
  opButtons.forEach(function (btn) {
    btn.classList.toggle("active", !hasError && operator === btn.dataset.op && freshEntry && !justEvaluated);
  });
}

function setExpression(text) { exprEl.textContent = text; }

// ---- Actions ----
function resetAll() {
  current = "0";
  previous = null;
  operator = null;
  freshEntry = true;
  justEvaluated = false;
  hasError = false;
  setExpression("");
}

function showError(message) {
  hasError = true;
  current = message;
  previous = null;
  operator = null;
  freshEntry = true;
  justEvaluated = false;
}

function inputDigit(d) {
  if (hasError) resetAll();
  if (freshEntry || justEvaluated) {
    if (justEvaluated) { setExpression(""); previous = null; operator = null; }
    current = d;
    freshEntry = false;
    justEvaluated = false;
  } else if (current === "0") {
    current = d;
  } else if (current.replace(/[-.]/g, "").length < 15) {
    current += d;
  }
  render();
}

function inputDecimal() {
  if (hasError) resetAll();
  if (freshEntry || justEvaluated) {
    if (justEvaluated) { setExpression(""); previous = null; operator = null; }
    current = "0.";
    freshEntry = false;
    justEvaluated = false;
  } else if (!current.includes(".")) {
    current += ".";
  }
  render();
}

function chooseOperator(op) {
  if (hasError) return;
  const currentValue = parseFloat(current);

  if (operator && !freshEntry) {
    // Chain: resolve the pending operation first (5 + 3 × ... → 8 ×)
    const result = calculate(previous, operator, currentValue);
    if (result === null) { setExpression(""); showError("Cannot divide by 0"); render(); return; }
    previous = result;
    current = formatNumber(result);
  } else if (!operator || justEvaluated) {
    previous = currentValue;
  }
  // if an operator was just pressed, simply swap it

  operator = op;
  freshEntry = true;
  justEvaluated = false;
  setExpression(formatNumber(previous) + " " + op);
  render();
}

function evaluate() {
  if (hasError || operator === null || previous === null) return;
  const right = parseFloat(current);
  const left = previous;
  const result = calculate(left, operator, right);
  if (result === null) {
    setExpression(formatNumber(left) + " " + operator + " " + formatNumber(right) + " =");
    showError("Cannot divide by 0");
    render();
    return;
  }
  setExpression(formatNumber(left) + " " + operator + " " + formatNumber(right) + " =");
  current = formatNumber(result);
  previous = null;
  operator = null;
  freshEntry = true;
  justEvaluated = true;
  render();
}

function backspace() {
  if (hasError) { resetAll(); render(); return; }
  if (freshEntry || justEvaluated) return;
  current = current.length > 1 ? current.slice(0, -1) : "0";
  if (current === "-" ) current = "0";
  render();
}

function clearAll() { resetAll(); render(); }

// ---- Event listeners (one per button, no inline handlers) ----
document.querySelectorAll("#keys button").forEach(function (button) {
  button.addEventListener("click", function () {
    switch (button.dataset.action) {
      case "digit":     inputDigit(button.dataset.digit); break;
      case "decimal":   inputDecimal(); break;
      case "operator":  chooseOperator(button.dataset.op); break;
      case "equals":    evaluate(); break;
      case "clear":     clearAll(); break;
      case "backspace": backspace(); break;
    }
  });
});

// Keyboard support
document.addEventListener("keydown", function (e) {
  const k = e.key;
  if (k >= "0" && k <= "9") inputDigit(k);
  else if (k === ".") inputDecimal();
  else if (k === "+") chooseOperator("+");
  else if (k === "-") chooseOperator("−");
  else if (k === "*" || k === "x") chooseOperator("×");
  else if (k === "/") { e.preventDefault(); chooseOperator("÷"); }
  else if (k === "Enter" || k === "=") { e.preventDefault(); evaluate(); }
  else if (k === "Backspace") backspace();
  else if (k === "Escape" || k === "c" || k === "C") clearAll();
});

render();
