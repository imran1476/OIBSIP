[OIBSIP-WebDev-L2-Complete.md](https://github.com/user-attachments/files/33029676/OIBSIP-WebDev-L2-Complete.md)
# OIBSIP Web Development - Level 2 (Complete Package)

All four Level 2 tasks in one document: project descriptions, how the login system works,
the full source code, and the submission checklist.

## Contents

1. [Task 1 - Calculator](#task-1---calculator)
2. [Task 2 - Tribute Page](#task-2---tribute-page)
3. [Task 3 - To-Do Web App](#task-3---to-do-web-app)
4. [Task 4 - Login Authentication System](#task-4---login-authentication-system)
5. [How authentication works](#how-authentication-works)
6. [Submission checklist](#submission-checklist)

Folder names to use inside your `OIBSIP` GitHub repository:

```
OIBSIP/
  WebDev-L2-Calculator/
  WebDev-L2-TributePage/
  WebDev-L2-TodoApp/
  WebDev-L2-LoginSystem/
```

Each folder needs: source code, a `README.md`, and a `screenshots/` folder.

---

## Task 1 - Calculator

Folder: `WebDev-L2-Calculator/`

## Calculator (Web Development - Level 2, Task 1)

A browser-based calculator built with vanilla HTML5, CSS3 and JavaScript.
No libraries, no frameworks, and no `eval()`: all arithmetic is done with
variables, `switch` statements and conditionals.

### How to run

Open `index.html` in any modern browser. No build step or server is needed.

### Features

- Display screen showing the current input, the result, and the pending expression
- Number buttons (0-9) and a decimal point
- Operators: addition (+), subtraction (-), multiplication (x), division (/)
- Equals (=) button to evaluate
- Clear (C) button to reset everything
- Backspace button to remove the last entered character
- Division by zero shows "Cannot divide by 0" instead of crashing
- Operator chaining without a reset (for example 5 + 3 x 2)
- CSS Grid for the button layout
- All buttons use `addEventListener` (no inline `onclick` attributes)
- Bonus: keyboard support, light/dark theme, floating-point rounding (0.1 + 0.2 = 0.3)

### Operator chaining

Operations are evaluated left to right as each operator is pressed,
like a standard handheld calculator:

`5 + 3 x 2` -> pressing x computes `5 + 3 = 8`, then `8 x 2 = 16`.

### Keyboard shortcuts

| Key | Action |
| --- | --- |
| 0-9, `.` | Enter digits |
| `+`, `-`, `*`, `/` | Operators |
| `Enter` or `=` | Equals |
| `Backspace` | Delete last character |
| `Esc` or `C` | Clear |

### Project structure

```
WebDev-L2-Calculator/
  index.html   page structure
  style.css    styling (CSS Grid layout, light/dark theme)
  script.js    calculator logic and event listeners
  README.md    this file
```

### Tech stack

HTML5, CSS3 (Grid), JavaScript (vanilla)

### Screenshots

Add your screenshots to a `screenshots/` folder in this directory.

### Source code

<details>
<summary><code>WebDev-L2-Calculator/index.html</code></summary>

~~~~html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Calculator</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="calc" aria-label="Calculator">
    <div class="screen" role="group" aria-label="Display">
      <div class="expression" id="expression"></div>
      <div class="value" id="value" aria-live="polite">0</div>
    </div>
    <div class="keys" id="keys">
      <button class="clear" data-action="clear" aria-label="Clear">C</button>
      <button class="clear" data-action="backspace" aria-label="Backspace">⌫</button>
      <button class="op" data-action="operator" data-op="÷" aria-label="Divide">÷</button>
      <button class="op" data-action="operator" data-op="×" aria-label="Multiply">×</button>

      <button data-action="digit" data-digit="7">7</button>
      <button data-action="digit" data-digit="8">8</button>
      <button data-action="digit" data-digit="9">9</button>
      <button class="op" data-action="operator" data-op="−" aria-label="Subtract">−</button>

      <button data-action="digit" data-digit="4">4</button>
      <button data-action="digit" data-digit="5">5</button>
      <button data-action="digit" data-digit="6">6</button>
      <button class="op" data-action="operator" data-op="+" aria-label="Add">+</button>

      <button data-action="digit" data-digit="1">1</button>
      <button data-action="digit" data-digit="2">2</button>
      <button data-action="digit" data-digit="3">3</button>
      <button class="equals" data-action="equals" aria-label="Equals">=</button>

      <button class="zero" data-action="digit" data-digit="0">0</button>
      <button data-action="decimal" aria-label="Decimal point">.</button>
    </div>
  </main>

<script src="script.js"></script>
</body>
</html>
~~~~

</details>

<details>
<summary><code>WebDev-L2-Calculator/style.css</code></summary>

~~~~css
:root {
  box-sizing: border-box;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  --page: #e9edf0;
  --body: #cfd8dd;
  --screen: #1b2a30;
  --screen-text: #c9f2dc;
  --screen-sub: #7fa79a;
  --key: #f5f7f8;
  --key-text: #1b2a30;
  --key-shadow: #a9b6bd;
  --op: #3a6a94;
  --op-text: #ffffff;
  --op-shadow: #26485f;
  --eq: #d9822b;
  --eq-shadow: #9a5a18;
  --clear: #b7c3ca;
  --error: #ff9d8a;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --page: #12181b;
    --body: #222d33;
    --screen: #0c1316;
    --key: #34434b;
    --key-text: #eef3f5;
    --key-shadow: #151d21;
    --op: #4b86b8;
    --op-shadow: #1f3a52;
    --clear: #4a5a63;
  }
}
:root[data-theme="dark"] {
  --page: #12181b;
  --body: #222d33;
  --screen: #0c1316;
  --key: #34434b;
  --key-text: #eef3f5;
  --key-shadow: #151d21;
  --op: #4b86b8;
  --op-shadow: #1f3a52;
  --clear: #4a5a63;
}
html { scroll-padding-top: env(safe-area-inset-top, 0px); }
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 16px;
  background: var(--page);
  font-family: "DM Sans", system-ui, -apple-system, "Segoe UI", sans-serif;
}
.calc {
  width: 100%;
  max-width: 340px;
  background: var(--body);
  border-radius: 22px;
  padding: 18px;
  box-shadow: 0 18px 40px rgba(20, 40, 50, .22);
}
.screen {
  background: var(--screen);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 16px;
  text-align: right;
  min-height: 104px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.expression {
  min-height: 1.4em;
  font-size: .95rem;
  color: var(--screen-sub);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.value {
  font-family: "DM Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 2.4rem;
  line-height: 1.2;
  color: var(--screen-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-variant-numeric: tabular-nums;
}
.value.small { font-size: 1.7rem; }
.value.xsmall { font-size: 1.2rem; }
.value.error { color: var(--error); font-size: 1.25rem; }

.keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 62px);
  gap: 10px;
}
button {
  font: inherit;
  font-size: 1.35rem;
  font-weight: 500;
  border: 0;
  border-radius: 12px;
  background: var(--key);
  color: var(--key-text);
  box-shadow: 0 3px 0 var(--key-shadow);
  cursor: pointer;
  transition: transform .06s, box-shadow .06s;
  -webkit-tap-highlight-color: transparent;
}
button:active { transform: translateY(3px); box-shadow: 0 0 0 var(--key-shadow); }
button:focus-visible { outline: 3px solid var(--eq); outline-offset: 2px; }
button.op { background: var(--op); color: var(--op-text); box-shadow: 0 3px 0 var(--op-shadow); }
button.op:active { box-shadow: 0 0 0 var(--op-shadow); }
button.op.active { outline: 3px solid var(--screen-text); outline-offset: 2px; }
button.clear { background: var(--clear); }
button.equals { background: var(--eq); color: #fff; box-shadow: 0 3px 0 var(--eq-shadow); }
button.equals:active { box-shadow: 0 0 0 var(--eq-shadow); }
.zero { grid-column: span 2; }
.equals { grid-column: 4; grid-row: span 2; }
@media (prefers-reduced-motion: reduce) { button { transition: none; } }
~~~~

</details>

<details>
<summary><code>WebDev-L2-Calculator/script.js</code></summary>

~~~~javascript
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
~~~~

</details>


---

## Task 2 - Tribute Page

Folder: `WebDev-L2-TributePage/`

## Tribute Page: Marie Curie (Web Development - Level 2, Task 2)

A responsive tribute page dedicated to Marie Curie (1867-1934), the physicist and chemist
who discovered polonium and radium. Built with HTML5 and CSS3 only (no JavaScript needed).

### How to run

Open `index.html` in a browser. An internet connection is needed to load the portrait
(from Wikimedia Commons) and the Google Fonts.

### Checklist

- [x] Page title with the subject's name and a one-line tagline
- [x] Prominent image (royalty-free)
- [x] Biography: 4 paragraphs of original written content
- [x] Timeline of key achievements (styled ordered list)
- [x] Quote block, styled distinctly
- [x] 3 different background colours across sections (dark ink, light grey-green, deep green)
- [x] 2 font styles: Fraunces (serif) for headings, Source Sans 3 (sans-serif) for body text
- [x] Responsive layout (single column under 800px)

### Image credit

Portrait of Marie Curie, c. 1920, by Henri Manuel. Public domain, via Wikimedia Commons
(file: `Marie_Curie_c1920.jpg`).

### Sources

Facts were researched from the Nobel Prize organisation website and Britannica,
then paraphrased in my own words. The quote is widely attributed to Marie Curie.

### Project structure

```
WebDev-L2-TributePage/
  index.html
  style.css
  README.md
```

### Screenshots

Add your screenshots to a `screenshots/` folder in this directory.

### Source code

<details>
<summary><code>WebDev-L2-TributePage/index.html</code></summary>

~~~~html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Marie Curie | A Tribute</title>
<meta name="description" content="A tribute to Marie Curie, the physicist and chemist who discovered polonium and radium.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;0,800;1,400&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<header class="hero" id="top">
  <div class="hero-text">
    <h1>Marie Curie</h1>
    <p class="tagline">She followed an invisible light until it changed science and medicine.</p>
    <p class="dates">1867 &ndash; 1934</p>
  </div>
  <figure class="portrait">
    <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Marie_Curie_c1920.jpg?width=700"
         alt="Black and white portrait photograph of Marie Curie, around 1920" width="700" height="951">
    <figcaption>Marie Curie, c. 1920. Photo by Henri Manuel, public domain via Wikimedia Commons.</figcaption>
  </figure>
</header>

<main>
  <section class="bio" aria-labelledby="bio-title">
    <h2 id="bio-title">A life given to discovery</h2>
    <p>Maria Skłodowska was born in Warsaw in 1867, when Poland was ruled by the Russian Empire. Her parents were teachers who valued learning, but women were barred from universities in her homeland. She studied in secret at an underground school, worked as a governess, and saved money so her sister could study medicine in Paris. In 1891 it was finally her turn, and she travelled to France to study at the Sorbonne.</p>
    <p>In Paris she lived on very little and often forgot to eat while studying physics and mathematics. There she met the physicist Pierre Curie, and they married in 1895. Inspired by Henri Becquerel's work on uranium, she showed that the mysterious rays came from the atoms themselves and gave the phenomenon its name: radioactivity. In 1898 the couple announced two new elements, polonium, which she named after her native Poland, and radium.</p>
    <p>Proving radium was real took years of back-breaking work in a drafty converted shed, where she refined heavy sacks of ore by hand. The effort earned her the 1903 Nobel Prize in Physics, shared with Pierre and Becquerel. After Pierre died in a street accident in 1906, she took over his teaching post and became the first woman to be a professor at the Sorbonne. In 1911 she won a second Nobel Prize, this time in Chemistry, and she remains the only person honoured in two different sciences.</p>
    <p>When the First World War began, Curie put her knowledge to work. She helped equip vehicles with X-ray machines, nicknamed &ldquo;little Curies&rdquo;, so surgeons could find bullets and shrapnel near the front lines, and she trained women to operate them. She also built up the Radium Institute in Paris into a leading research centre. Years of handling radioactive material almost certainly harmed her health, and she died in 1934. Her notebooks are still radioactive today and are kept in lead-lined boxes.</p>
  </section>

  <section class="quote-band" aria-label="Quote">
    <blockquote>
      <p>Nothing in life is to be feared, it is only to be understood.</p>
      <footer>Marie Curie (attributed)</footer>
    </blockquote>
  </section>

  <section class="timeline" aria-labelledby="timeline-title">
    <h2 id="timeline-title">Key moments</h2>
    <ol>
      <li><span class="year">1867</span><span class="event">Born on 7 November in Warsaw.</span></li>
      <li><span class="year">1891</span><span class="event">Moves to Paris to study at the Sorbonne.</span></li>
      <li><span class="year">1895</span><span class="event">Marries Pierre Curie.</span></li>
      <li><span class="year">1898</span><span class="event">Announces the discovery of polonium and radium.</span></li>
      <li><span class="year">1903</span><span class="event">Wins the Nobel Prize in Physics, shared with Pierre Curie and Henri Becquerel.</span></li>
      <li><span class="year">1906</span><span class="event">Becomes the first woman professor at the Sorbonne after Pierre's death.</span></li>
      <li><span class="year">1911</span><span class="event">Wins the Nobel Prize in Chemistry.</span></li>
      <li><span class="year">1914</span><span class="event">Brings mobile X-ray units to the front lines during the First World War.</span></li>
      <li><span class="year">1934</span><span class="event">Dies on 4 July in France, leaving a legacy that still shapes medicine.</span></li>
    </ol>
  </section>
</main>

<footer class="site-footer">
  <p>Written as a tribute for the Oasis Infobyte Web Development internship (Level 2, Task 2).</p>
  <p>Sources for research: Nobel Prize organisation and Britannica. Content paraphrased in my own words.</p>
  <p><a href="#top">Back to top</a></p>
</footer>

</body>
</html>
~~~~

</details>

<details>
<summary><code>WebDev-L2-TributePage/style.css</code></summary>

~~~~css
:root {
  --ink: #0d1b1e;
  --glow: #7de3c3;
  --glow-soft: rgba(125, 227, 195, .35);
  --paper: #e9efec;
  --text: #1c2a2d;
  --deep: #1b4a45;
  --muted: #9bb5b0;
  --serif: "Fraunces", Georgia, "Times New Roman", serif;
  --sans: "Source Sans 3", system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: var(--sans);
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text);
  background: var(--paper);
}
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; }
a:focus-visible { outline: 3px solid var(--glow); outline-offset: 3px; }

/* Hero: dark background */
.hero {
  background: var(--ink);
  color: #f1f7f5;
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 48px;
  align-items: center;
  padding: 72px max(24px, 7vw);
  min-height: 100vh;
}
.hero h1 {
  font-family: var(--serif);
  font-weight: 800;
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1;
  margin: 0 0 20px;
  text-shadow: 0 0 40px var(--glow-soft);
}
.tagline {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  line-height: 1.4;
  color: var(--glow);
  max-width: 24ch;
  margin: 0 0 24px;
}
.dates { color: var(--muted); font-size: 1rem; margin: 0; }

.portrait { margin: 0; justify-self: center; max-width: 380px; }
.portrait img {
  border-radius: 6px;
  background: #1a2a2e;
  box-shadow: 0 0 0 1px var(--glow-soft), 0 0 70px var(--glow-soft);
  filter: grayscale(1) contrast(1.05);
}
.portrait figcaption { margin-top: 12px; font-size: .85rem; color: var(--muted); line-height: 1.4; }

/* Biography: light background */
.bio {
  max-width: 68ch;
  margin: 0 auto;
  padding: 88px 24px 64px;
}
h2 {
  font-family: var(--serif);
  font-weight: 600;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  line-height: 1.2;
  margin: 0 0 28px;
}
.bio p { margin: 0 0 1.3em; }

/* Quote: deep green background */
.quote-band {
  background: var(--deep);
  color: #f1f7f5;
  padding: 80px 24px;
}
blockquote {
  max-width: 24em;
  margin: 0 auto;
  padding-left: 28px;
  border-left: 4px solid var(--glow);
}
blockquote p {
  font-family: var(--serif);
  font-style: italic;
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  line-height: 1.35;
  margin: 0 0 16px;
}
blockquote footer { color: var(--glow); font-size: 1rem; }

/* Timeline: light background */
.timeline { max-width: 760px; margin: 0 auto; padding: 88px 24px; }
.timeline ol {
  list-style: none;
  margin: 0;
  padding: 0 0 0 28px;
  border-left: 3px solid var(--deep);
}
.timeline li {
  position: relative;
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 8px;
  padding-bottom: 26px;
}
.timeline li::before {
  content: "";
  position: absolute;
  left: -37px;
  top: .55em;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--paper);
  border: 3px solid var(--deep);
}
.year { font-family: var(--serif); font-weight: 800; font-size: 1.25rem; color: var(--deep); }

/* Footer */
.site-footer {
  background: var(--ink);
  color: var(--muted);
  text-align: center;
  padding: 40px 24px;
  font-size: .95rem;
}
.site-footer p { margin: 0 0 8px; }
.site-footer a { color: var(--glow); }

/* Responsive */
@media (max-width: 800px) {
  .hero { grid-template-columns: 1fr; min-height: auto; padding: 56px 24px; gap: 36px; text-align: left; }
  .portrait { max-width: 300px; justify-self: start; }
  .timeline li { grid-template-columns: 1fr; gap: 0; }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
~~~~

</details>


---

## Task 3 - To-Do Web App

Folder: `WebDev-L2-TodoApp/`

## To-Do Web App (Web Development - Level 2, Task 3)

An interactive to-do list built with vanilla HTML5, CSS3 and JavaScript. Tasks are split into
Pending and Completed lists, and they are saved in the browser so they survive a page refresh.

### How to run

Open `index.html` in a browser. No build step or server is needed.
(Google Fonts load online; the app falls back to system fonts if offline.)

### Checklist

- [x] Input field and "Add Task" button (Enter key also works)
- [x] New tasks appear immediately in the Pending Tasks list
- [x] Tick the checkbox to move a task to Completed (untick to move it back)
- [x] Edit button for inline editing (Save, Cancel, Enter to save, Esc to cancel)
- [x] Delete button removes a task permanently from either list
- [x] Counters above each list: "X pending" and "Y completed"
- [x] Bonus: timestamp for when each task was added and completed
- [x] Bonus: tasks persist across refreshes using `localStorage`
- [x] Empty state messages for both lists
- [x] Input validation: empty tasks are rejected with a message

### Notes

- Text is inserted with `textContent`, so typed HTML is never executed.
- If `localStorage` is blocked (for example in some private modes), the app still works for the current session.

### Project structure

```
WebDev-L2-TodoApp/
  index.html
  style.css
  script.js
  README.md
```

### Screenshots

Add your screenshots to a `screenshots/` folder in this directory.

### Source code

<details>
<summary><code>WebDev-L2-TodoApp/index.html</code></summary>

~~~~html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>To-Do App</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<main class="app">
  <h1>Today's tasks</h1>

  <div class="add-row">
    <label class="sr-only" for="task-input">New task</label>
    <input id="task-input" type="text" placeholder="What needs to get done?" maxlength="120" autocomplete="off">
    <button id="add-btn" type="button">Add Task</button>
  </div>
  <p id="form-error" class="form-error" role="alert"></p>

  <div class="lists">
    <section class="panel" aria-labelledby="pending-title">
      <div class="panel-head">
        <h2 id="pending-title">Pending Tasks</h2>
        <span class="count" id="pending-count">0 pending</span>
      </div>
      <ul id="pending-list" class="task-list"></ul>
      <p id="pending-empty" class="empty">Nothing pending. Add a task above to get started.</p>
    </section>

    <section class="panel done" aria-labelledby="completed-title">
      <div class="panel-head">
        <h2 id="completed-title">Completed Tasks</h2>
        <span class="count" id="completed-count">0 completed</span>
      </div>
      <ul id="completed-list" class="task-list"></ul>
      <p id="completed-empty" class="empty">No completed tasks yet. Tick a task when it is done.</p>
    </section>
  </div>
</main>
<script src="script.js"></script>
</body>
</html>
~~~~

</details>

<details>
<summary><code>WebDev-L2-TodoApp/style.css</code></summary>

~~~~css
:root {
  --bg: #e8edf5;
  --card: #ffffff;
  --text: #1a2233;
  --muted: #667089;
  --line: #d9e0ec;
  --accent: #2d5bd0;
  --accent-text: #ffffff;
  --done: #2c8a64;
  --danger: #c0392b;
  --heading: "Bricolage Grotesque", system-ui, -apple-system, "Segoe UI", Arial, sans-serif;
  --body: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--body);
  line-height: 1.5;
  padding: 32px 16px;
}
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.app { max-width: 900px; margin: 0 auto; }
h1 { font-family: var(--heading); font-weight: 800; font-size: clamp(2rem, 6vw, 3rem); margin: 0 0 20px; }
h2 { font-family: var(--heading); font-weight: 600; font-size: 1.25rem; margin: 0; }

.add-row { display: flex; gap: 10px; }
input[type="text"] {
  flex: 1;
  min-width: 0;
  font: inherit;
  padding: 12px 14px;
  border: 2px solid var(--line);
  border-radius: 10px;
  background: var(--card);
  color: var(--text);
}
input[type="text"]:focus { outline: none; border-color: var(--accent); }
button {
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  border: 0;
  border-radius: 10px;
  padding: 10px 16px;
  background: var(--accent);
  color: var(--accent-text);
}
button:hover { filter: brightness(1.08); }
button:focus-visible, input:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
button.ghost { background: transparent; color: var(--accent); padding: 6px 10px; }
button.danger { background: transparent; color: var(--danger); padding: 6px 10px; }
.form-error { color: var(--danger); min-height: 1.5em; margin: 6px 0 14px; font-size: .95rem; }

.lists { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
.panel { background: var(--card); border-radius: 16px; padding: 20px; box-shadow: 0 2px 10px rgba(26, 34, 51, .08); }
.panel-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
.count { font-size: .9rem; font-weight: 600; color: var(--accent); }
.panel.done .count { color: var(--done); }

.task-list { list-style: none; margin: 0; padding: 0; }
.task { display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; padding: 12px 0; border-top: 1px solid var(--line); }
.task:first-child { border-top: 0; }
.task input[type="checkbox"] { width: 20px; height: 20px; margin-top: 3px; accent-color: var(--done); cursor: pointer; }
.task-text { overflow-wrap: anywhere; }
.done .task-text { text-decoration: line-through; color: var(--muted); }
.meta { grid-column: 2; font-size: .8rem; color: var(--muted); }
.actions { grid-column: 2; display: flex; gap: 4px; margin-left: -10px; }
.edit-row { grid-column: 2; display: flex; gap: 8px; flex-wrap: wrap; }
.edit-row input { flex: 1 1 140px; padding: 8px 10px; }
.empty { color: var(--muted); font-size: .95rem; margin: 8px 0 0; }
.empty[hidden] { display: none; }

@media (max-width: 700px) {
  .lists { grid-template-columns: 1fr; }
  .add-row { flex-direction: column; }
}
~~~~

</details>

<details>
<summary><code>WebDev-L2-TodoApp/script.js</code></summary>

~~~~javascript
// To-Do App: vanilla JavaScript, tasks saved in localStorage.
const STORAGE_KEY = "oibsip-todo-tasks";

const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const formError = document.getElementById("form-error");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");
const pendingEmpty = document.getElementById("pending-empty");
const completedEmpty = document.getElementById("completed-empty");

let tasks = loadTasks();
let editingId = null;

// ---- Storage ----
function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (err) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    // Storage may be unavailable (private mode); the app still works for this session.
  }
}

// ---- Helpers ----
function formatTime(timestamp) {
  return new Date(timestamp).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// ---- Actions ----
function addTask() {
  const text = input.value.trim();
  if (text === "") {
    formError.textContent = "Type a task before adding it.";
    input.focus();
    return;
  }
  formError.textContent = "";
  tasks.unshift({ id: makeId(), text: text, completed: false, createdAt: Date.now(), completedAt: null });
  input.value = "";
  input.focus();
  saveAndRender();
}

function toggleTask(id) {
  const task = tasks.find(function (t) { return t.id === id; });
  if (!task) return;
  task.completed = !task.completed;
  task.completedAt = task.completed ? Date.now() : null;
  if (editingId === id) editingId = null;
  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  if (editingId === id) editingId = null;
  saveAndRender();
}

function saveEdit(id, newText) {
  const text = newText.trim();
  if (text === "") return false;
  const task = tasks.find(function (t) { return t.id === id; });
  if (task) task.text = text;
  editingId = null;
  saveAndRender();
  return true;
}

function saveAndRender() {
  saveTasks();
  render();
}

// ---- Rendering ----
function buildTask(task) {
  const li = el("li", "task");

  const checkbox = el("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", task.completed ? "Mark as pending: " + task.text : "Mark as complete: " + task.text);
  checkbox.addEventListener("change", function () { toggleTask(task.id); });
  li.appendChild(checkbox);

  if (editingId === task.id) {
    const row = el("div", "edit-row");
    const editInput = el("input");
    editInput.type = "text";
    editInput.value = task.text;
    editInput.maxLength = 120;
    editInput.setAttribute("aria-label", "Edit task text");

    const saveBtn = el("button", "", "Save");
    saveBtn.type = "button";
    saveBtn.addEventListener("click", function () {
      if (!saveEdit(task.id, editInput.value)) editInput.focus();
    });

    const cancelBtn = el("button", "ghost", "Cancel");
    cancelBtn.type = "button";
    cancelBtn.addEventListener("click", function () { editingId = null; render(); });

    editInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { if (!saveEdit(task.id, editInput.value)) editInput.focus(); }
      if (e.key === "Escape") { editingId = null; render(); }
    });

    row.append(editInput, saveBtn, cancelBtn);
    li.appendChild(row);
    setTimeout(function () { editInput.focus(); editInput.select(); }, 0);
  } else {
    li.appendChild(el("span", "task-text", task.text));
  }

  let meta = "Added " + formatTime(task.createdAt);
  if (task.completed && task.completedAt) meta += " · Completed " + formatTime(task.completedAt);
  li.appendChild(el("span", "meta", meta));

  if (editingId !== task.id) {
    const actions = el("div", "actions");
    const editBtn = el("button", "ghost", "Edit");
    editBtn.type = "button";
    editBtn.addEventListener("click", function () { editingId = task.id; render(); });
    const delBtn = el("button", "danger", "Delete");
    delBtn.type = "button";
    delBtn.addEventListener("click", function () { deleteTask(task.id); });
    actions.append(editBtn, delBtn);
    li.appendChild(actions);
  }
  return li;
}

function render() {
  pendingList.replaceChildren();
  completedList.replaceChildren();
  let pending = 0;
  let completed = 0;

  tasks.forEach(function (task) {
    if (task.completed) { completed++; completedList.appendChild(buildTask(task)); }
    else { pending++; pendingList.appendChild(buildTask(task)); }
  });

  pendingCount.textContent = pending + " pending";
  completedCount.textContent = completed + " completed";
  pendingEmpty.hidden = pending > 0;
  completedEmpty.hidden = completed > 0;
}

// ---- Event listeners ----
addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", function (e) { if (e.key === "Enter") addTask(); });
input.addEventListener("input", function () { formError.textContent = ""; });

render();
~~~~

</details>


---

## Task 4 - Login Authentication System

Folder: `WebDev-L2-LoginSystem/`

## Login Authentication System (Web Development - Level 2, Task 4)

A front-end only authentication system (Option A of the task): registration, login, a protected
dashboard and logout. Built with vanilla HTML5, CSS3 and JavaScript, using `localStorage` for
user records and `sessionStorage` for the active session.

### How to run

Open `index.html` in a browser (or serve the folder with any static server).
Password hashing uses the Web Crypto API, which needs a secure context: `file://`, `localhost`
and `https` all work in modern browsers.

### Pages

| File | Purpose |
| --- | --- |
| `index.html` | Login page |
| `register.html` | Registration page |
| `dashboard.html` | Protected page, only visible after login |
| `auth.js` | Shared helpers: storage, hashing, session, validation |
| `login.js`, `register.js`, `dashboard.js` | Page logic |
| `style.css` | Shared styling |

### Checklist

- [x] Registration page with email + password fields and a "Register" button
- [x] Password rules: minimum 8 characters and at least 1 number
- [x] Duplicate email check with an error message
- [x] Login page with email + password fields and a "Login" button
- [x] Incorrect credentials show one generic message, never revealing which field was wrong
- [x] Protected dashboard: opening `dashboard.html` directly without a session redirects to the login page
- [x] Logout button clears the session and redirects to the login page
- [x] Passwords are never stored in plain text: each one is salted (random 16 bytes) and hashed with SHA-256
- [x] Form validation on both pages: no empty submissions
- [x] Extras: confirm-password field, show/hide password button, logged-in users skip the login page

### How it works

1. **Register:** validate input, create a random salt, compute `SHA-256(salt + password)`, and save
   `{ email, salt, hash, createdAt }` in `localStorage`.
2. **Login:** find the user, hash the typed password with that user's salt, and compare it with the stored hash.
   On success the email is saved in `sessionStorage`.
3. **Dashboard:** `requireLogin()` checks for a valid session and redirects to `index.html` if there is none.
4. **Logout:** removes the session and redirects to the login page.

### Security notes (important)

This project is for learning. A front-end only system cannot be truly secure:

- Anyone with access to the browser can read `localStorage` and edit `sessionStorage`, so the
  dashboard guard only protects the page in the normal user flow.
- A fast hash like SHA-256 is not ideal for passwords. A real back end should use bcrypt, scrypt or Argon2.
- Real authentication needs a server that verifies credentials and issues secure sessions.

### Testing ideas

1. Register with a short password (error), then without a number (error), then a valid one.
2. Register the same email again (duplicate error).
3. Log in with a wrong password and with an unknown email (same generic message).
4. Open `dashboard.html` in a new tab without logging in (redirects to login).
5. Log in, then press Logout (back to login; dashboard is blocked again).

### Screenshots

Add your screenshots to a `screenshots/` folder in this directory.

### Source code

<details>
<summary><code>WebDev-L2-LoginSystem/index.html</code></summary>

~~~~html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Log in | SecureDesk</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="layout">
  <aside class="side">
    <p class="logo">SecureDesk</p>
    <h2>Your workspace is waiting for you.</h2>
    <p>Log in to open your private dashboard. Passwords are salted and hashed, never stored as plain text.</p>
  </aside>
  <main class="main">
    <div class="card">
      <h1>Log in</h1>
      <p class="lead">Welcome back. Enter your details to continue.</p>
      <div id="notice" class="notice" role="status" hidden></div>
      <form id="login-form" novalidate>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" autocomplete="email">
          <p class="error" id="email-error"></p>
        </div>
        <div class="field">
          <label for="password">Password</label>
          <div class="input-wrap">
            <input id="password" type="password" autocomplete="current-password">
            <button type="button" class="toggle" data-target="password" aria-label="Show password">Show</button>
          </div>
          <p class="error" id="password-error"></p>
        </div>
        <button class="btn" type="submit" id="submit-btn">Login</button>
      </form>
      <p class="switch">New here? <a href="register.html">Create an account</a></p>
    </div>
  </main>
</div>
<script src="auth.js"></script>
<script src="login.js"></script>
</body>
</html>
~~~~

</details>

<details>
<summary><code>WebDev-L2-LoginSystem/register.html</code></summary>

~~~~html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Register | SecureDesk</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="layout">
  <aside class="side">
    <p class="logo">SecureDesk</p>
    <h2>Create your account in under a minute.</h2>
    <p>Choose a password with at least 8 characters and 1 number. We store only a salted SHA-256 hash of it.</p>
  </aside>
  <main class="main">
    <div class="card">
      <h1>Register</h1>
      <p class="lead">Fill in the details below to get started.</p>
      <div id="notice" class="notice" role="alert" hidden></div>
      <form id="register-form" novalidate>
        <div class="field">
          <label for="email">Email</label>
          <input id="email" type="email" autocomplete="email">
          <p class="error" id="email-error"></p>
        </div>
        <div class="field">
          <label for="password">Password</label>
          <div class="input-wrap">
            <input id="password" type="password" autocomplete="new-password">
            <button type="button" class="toggle" data-target="password" aria-label="Show password">Show</button>
          </div>
          <p class="hint">At least 8 characters, including 1 number.</p>
          <p class="error" id="password-error"></p>
        </div>
        <div class="field">
          <label for="confirm">Confirm password</label>
          <input id="confirm" type="password" autocomplete="new-password">
          <p class="error" id="confirm-error"></p>
        </div>
        <button class="btn" type="submit" id="submit-btn">Register</button>
      </form>
      <p class="switch">Already registered? <a href="index.html">Log in</a></p>
    </div>
  </main>
</div>
<script src="auth.js"></script>
<script src="register.js"></script>
</body>
</html>
~~~~

</details>

<details>
<summary><code>WebDev-L2-LoginSystem/dashboard.html</code></summary>

~~~~html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dashboard | SecureDesk</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="dash" id="dash" hidden>
  <header class="dash-top">
    <p class="logo">SecureDesk</p>
    <button class="btn secondary" type="button" id="logout-btn">Logout</button>
  </header>
  <main class="panel">
    <h1 id="greeting">Welcome</h1>
    <p>You are logged in. This page is only visible with an active session.</p>
    <ul class="facts">
      <li><span>Signed in as</span><span id="user-email"></span></li>
      <li><span>Member since</span><span id="member-since"></span></li>
      <li><span>Session</span><span>Active until you log out or close this tab</span></li>
    </ul>
  </main>
</div>
<script src="auth.js"></script>
<script src="dashboard.js"></script>
</body>
</html>
~~~~

</details>

<details>
<summary><code>WebDev-L2-LoginSystem/auth.js</code></summary>

~~~~javascript
// Shared helpers for the login system (front-end only, learning project).
const USERS_KEY = "oibsip-auth-users";
const SESSION_KEY = "oibsip-auth-session";

// ---- Users (localStorage) ----
function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    return Array.isArray(users) ? users : [];
  } catch (err) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users)); // may throw; callers handle it
}

function findUser(email) {
  return getUsers().find(function (u) { return u.email === email; });
}

// ---- Hashing (SHA-256 with a random salt per user) ----
function hashingAvailable() {
  return !!(window.crypto && window.crypto.subtle);
}

function bytesToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(function (b) { return b.toString(16).padStart(2, "0"); })
    .join("");
}

function createSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes.buffer);
}

async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(salt + password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return bytesToHex(digest);
}

// ---- Session (sessionStorage: cleared when the tab closes or on logout) ----
function currentSessionEmail() {
  try { return sessionStorage.getItem(SESSION_KEY); } catch (err) { return null; }
}

function startSession(email) {
  sessionStorage.setItem(SESSION_KEY, email);
}

function endSession() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch (err) { /* ignore */ }
}

// Protected page guard: returns the user, or redirects to the login page.
function requireLogin() {
  const email = currentSessionEmail();
  const user = email ? findUser(email) : null;
  if (!user) {
    endSession();
    window.location.replace("index.html");
    return null;
  }
  return user;
}

function redirectIfLoggedIn() {
  const email = currentSessionEmail();
  if (email && findUser(email)) window.location.replace("dashboard.html");
}

// ---- Validation ----
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function passwordProblem(password) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/\d/.test(password)) return "Password must contain at least 1 number.";
  return "";
}

function setFieldError(inputEl, errorEl, message) {
  errorEl.textContent = message;
  if (message) inputEl.setAttribute("aria-invalid", "true");
  else inputEl.removeAttribute("aria-invalid");
}

function showNotice(box, message, type) {
  box.textContent = message;
  box.className = "notice " + (type === "ok" ? "ok-box" : "error-box");
  box.hidden = !message;
}

// ---- Show/hide password buttons ----
document.querySelectorAll(".toggle").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const field = document.getElementById(btn.dataset.target);
    const showing = field.type === "text";
    field.type = showing ? "password" : "text";
    btn.textContent = showing ? "Show" : "Hide";
    btn.setAttribute("aria-label", (showing ? "Show" : "Hide") + " password");
  });
});
~~~~

</details>

<details>
<summary><code>WebDev-L2-LoginSystem/login.js</code></summary>

~~~~javascript
// Login page logic.
redirectIfLoggedIn();

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const notice = document.getElementById("notice");
const submitBtn = document.getElementById("submit-btn");

if (new URLSearchParams(window.location.search).get("registered") === "1") {
  showNotice(notice, "Account created. Please log in.", "ok");
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  showNotice(notice, "", "error");

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;

  // Basic validation: no empty submissions
  setFieldError(emailInput, emailError, email === "" ? "Enter your email." : "");
  setFieldError(passwordInput, passwordError, password === "" ? "Enter your password." : "");
  if (email === "" || password === "") return;

  if (!hashingAvailable()) {
    showNotice(notice, "This browser cannot hash passwords here. Open the page over https or localhost.", "error");
    return;
  }

  submitBtn.disabled = true;
  try {
    const user = findUser(email);
    let ok = false;
    if (user) {
      const hash = await hashPassword(password, user.salt);
      ok = hash === user.hash;
    }
    if (!ok) {
      // One generic message: never reveal whether the email or the password was wrong.
      showNotice(notice, "Incorrect email or password.", "error");
      return;
    }
    startSession(user.email);
    window.location.replace("dashboard.html");
  } catch (err) {
    showNotice(notice, "Something went wrong. Please try again.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});
~~~~

</details>

<details>
<summary><code>WebDev-L2-LoginSystem/register.js</code></summary>

~~~~javascript
// Registration page logic.
redirectIfLoggedIn();

const form = document.getElementById("register-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmError = document.getElementById("confirm-error");
const notice = document.getElementById("notice");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  showNotice(notice, "", "error");

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  // Validation: no empty fields, valid email, password rules, matching confirmation
  let emailMsg = "";
  if (email === "") emailMsg = "Enter your email.";
  else if (!isValidEmail(email)) emailMsg = "Enter a valid email address.";

  let passwordMsg = "";
  if (password === "") passwordMsg = "Enter a password.";
  else passwordMsg = passwordProblem(password);

  let confirmMsg = "";
  if (confirm === "") confirmMsg = "Confirm your password.";
  else if (confirm !== password) confirmMsg = "Passwords do not match.";

  setFieldError(emailInput, emailError, emailMsg);
  setFieldError(passwordInput, passwordError, passwordMsg);
  setFieldError(confirmInput, confirmError, confirmMsg);
  if (emailMsg || passwordMsg || confirmMsg) return;

  if (!hashingAvailable()) {
    showNotice(notice, "This browser cannot hash passwords here. Open the page over https or localhost.", "error");
    return;
  }

  // Duplicate check
  if (findUser(email)) {
    setFieldError(emailInput, emailError, "An account with this email already exists.");
    return;
  }

  submitBtn.disabled = true;
  try {
    const salt = createSalt();
    const hash = await hashPassword(password, salt);
    const users = getUsers();
    users.push({ email: email, salt: salt, hash: hash, createdAt: Date.now() });
    saveUsers(users);
    window.location.replace("index.html?registered=1");
  } catch (err) {
    showNotice(notice, "Could not save your account. Check that browser storage is enabled.", "error");
  } finally {
    submitBtn.disabled = false;
  }
});
~~~~

</details>

<details>
<summary><code>WebDev-L2-LoginSystem/dashboard.js</code></summary>

~~~~javascript
// Protected page: redirects to the login page when there is no valid session.
const user = requireLogin();

if (user) {
  document.getElementById("greeting").textContent = "Welcome, " + user.email.split("@")[0];
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("member-since").textContent =
    new Date(user.createdAt).toLocaleDateString([], { dateStyle: "long" });
  document.getElementById("dash").hidden = false;

  document.getElementById("logout-btn").addEventListener("click", function () {
    endSession();
    window.location.replace("index.html");
  });
}
~~~~

</details>

<details>
<summary><code>WebDev-L2-LoginSystem/style.css</code></summary>

~~~~css
:root {
  --brand: #12343b;
  --brand-text: #e8f3f1;
  --accent: #d96b12;
  --accent-text: #ffffff;
  --bg: #f4f6f7;
  --card: #ffffff;
  --text: #17262a;
  --muted: #5d6f73;
  --line: #cfd9db;
  --error: #b3261e;
  --success: #1f7a4d;
  --font: "Manrope", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: var(--font); color: var(--text); background: var(--bg); line-height: 1.5; }
[hidden] { display: none !important; }

.layout { min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr; }
.side {
  background: var(--brand);
  color: var(--brand-text);
  padding: 56px max(32px, 5vw);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.side .logo { font-weight: 800; font-size: 1.6rem; margin: 0 0 24px; }
.side h2 { font-size: clamp(1.6rem, 3vw, 2.4rem); line-height: 1.2; margin: 0 0 16px; max-width: 16em; }
.side p { color: #b9d2ce; max-width: 30em; margin: 0; }
.main { display: grid; place-items: center; padding: 32px 20px; }

.card { width: 100%; max-width: 400px; }
.card h1 { font-size: 1.9rem; margin: 0 0 6px; }
.card .lead { color: var(--muted); margin: 0 0 24px; }

.field { margin-bottom: 18px; }
label { display: block; font-weight: 600; margin-bottom: 6px; }
.input-wrap { position: relative; }
input {
  width: 100%;
  font: inherit;
  padding: 12px 14px;
  border: 2px solid var(--line);
  border-radius: 10px;
  background: var(--card);
  color: var(--text);
}
input:focus { outline: none; border-color: var(--accent); }
input[aria-invalid="true"] { border-color: var(--error); }
.input-wrap input { padding-right: 70px; }
.toggle {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: 0;
  color: var(--muted);
  font: inherit;
  font-size: .9rem;
  font-weight: 600;
  padding: 6px 8px;
  cursor: pointer;
}
.hint { color: var(--muted); font-size: .85rem; margin: 6px 0 0; }
.error { color: var(--error); font-size: .9rem; margin: 6px 0 0; min-height: 1.2em; }
.notice { padding: 10px 14px; border-radius: 10px; margin-bottom: 18px; font-size: .95rem; }
.notice.error-box { background: #fbe9e7; color: var(--error); }
.notice.ok-box { background: #e3f4ea; color: var(--success); }

.btn {
  width: 100%;
  font: inherit;
  font-weight: 700;
  padding: 13px 16px;
  border: 0;
  border-radius: 10px;
  background: var(--accent);
  color: var(--accent-text);
  cursor: pointer;
}
.btn:hover { filter: brightness(1.07); }
.btn:disabled { opacity: .6; cursor: wait; }
.btn.secondary { background: transparent; color: var(--brand); border: 2px solid var(--brand); width: auto; }
button:focus-visible, input:focus-visible, a:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
.switch { margin-top: 22px; color: var(--muted); }
.switch a { color: var(--brand); font-weight: 700; }

/* Dashboard */
.dash { max-width: 760px; margin: 0 auto; padding: 40px 20px; }
.dash-top { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 32px; }
.dash-top .logo { font-weight: 800; font-size: 1.4rem; color: var(--brand); margin: 0; }
.panel { background: var(--card); border-radius: 16px; padding: 28px; box-shadow: 0 2px 10px rgba(18, 52, 59, .08); }
.panel h1 { margin: 0 0 8px; font-size: 1.9rem; overflow-wrap: anywhere; }
.facts { margin: 20px 0 0; padding: 0; list-style: none; border-top: 1px solid var(--line); }
.facts li { padding: 12px 0; border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.facts span:first-child { color: var(--muted); }

@media (max-width: 800px) {
  .layout { grid-template-columns: 1fr; }
  .side { padding: 32px 24px; }
  .side h2 { font-size: 1.4rem; }
}
~~~~

</details>


---

## How authentication works

The login system runs entirely in the browser. There is no server.

**1. Register**
- The user enters an email and password. The code checks that the password has at least 8 characters
  and 1 number, and that no account with this email exists yet.
- The password is never saved as typed. A random 16-byte salt is created, and `salt + password` is hashed
  with SHA-256.
- Only `{ email, salt, hash, createdAt }` is saved in `localStorage`.

**2. Login**
- The code finds the user by email, then hashes the typed password with that user's salt.
- If the new hash matches the saved hash, login succeeds. If not (or the email is unknown), the same message
  is shown: "Incorrect email or password." This never reveals which field was wrong.
- On success the email is stored in `sessionStorage`. That is the session.

**3. Protected dashboard**
- `dashboard.html` runs `requireLogin()` first. It checks that `sessionStorage` holds an email and that the user still exists.
- If not, the visitor is redirected to `index.html`. The dashboard content stays hidden until the check passes.

**4. Logout**
- The session is removed from `sessionStorage` and the user is sent to the login page.

**Important:** this is a learning project, not real security. Anyone using the browser can read `localStorage` and
edit `sessionStorage` through DevTools. Real systems verify credentials on a server (with bcrypt, scrypt or Argon2)
and issue secure sessions.

---

## Submission checklist

**Setup (once)**
- [ ] Complete your LinkedIn profile and watch the tutorial from the task list
- [ ] Review the Placement Support Materials
- [ ] Create a public GitHub repository named exactly `OIBSIP`

**For each of the 4 tasks**
- [ ] Add the project folder to `OIBSIP` using the exact folder name above
- [ ] Add a `screenshots/` folder with a few screenshots
- [ ] Record a demo video that starts with a 2-second title card showing your Full Name, Track (Web Development & Designing) and Task Title
- [ ] Show the project working from start to finish (not just screenshots)
- [ ] Post the video on LinkedIn, tag Oasis Infobyte, and include `#oasisinfobyte` (plus tags like `#webdevelopment`)
- [ ] Watch at least 2 other interns' videos and leave a substantive comment on each

**Finish**
- [ ] Submit the Task Submission Form (link in your orientation or offer letter email) with your `OIBSIP` repository link
- [ ] Wait about 2 weeks for evaluation and your Completion Certificate

**Demo ideas per task**
- Calculator: show `5 + 3 x 2` chaining, division by zero, backspace and clear
- Tribute Page: scroll the whole page, then resize the window to show it is responsive
- To-Do App: add, edit, complete and delete tasks, then refresh to show persistence
- Login System: register (with invalid and valid passwords), duplicate email, wrong login, open the dashboard without logging in, then log in and log out
