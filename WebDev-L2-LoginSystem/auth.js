// Shared helpers for the login system (front-end only, learning project).
const USERS_KEY = "oibsip-auth-users";
const SESSION_KEY = "oibsip-auth-session";

// ---- Users (localStorage) ----
export function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY));
    return Array.isArray(users) ? users : [];
  } catch (err) {
    return [];
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users)); // may throw; callers handle it
}

export function findUser(email) {
  return getUsers().find(function (u) { return u.email === email; });
}

// ---- Hashing (SHA-256 with a random salt per user) ----
export function hashingAvailable() {
  return !!(window.crypto && window.crypto.subtle);
}

export function bytesToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(function (b) { return b.toString(16).padStart(2, "0"); })
    .join("");
}

export function createSalt() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes.buffer);
}

export async function hashPassword(password, salt) {
  const data = new TextEncoder().encode(salt + password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return bytesToHex(digest);
}

// ---- Session (sessionStorage: cleared when the tab closes or on logout) ----
export function currentSessionEmail() {
  try { return sessionStorage.getItem(SESSION_KEY); } catch (err) { return null; }
}

export function startSession(email) {
  sessionStorage.setItem(SESSION_KEY, email);
}

export function endSession() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch (err) { /* ignore */ }
}

// Protected page guard: returns the user, or redirects to the login page.
export function requireLogin() {
  const email = currentSessionEmail();
  const user = email ? findUser(email) : null;
  if (!user) {
    endSession();
    window.location.replace("index.html");
    return null;
  }
  return user;
}

export function redirectIfLoggedIn() {
  const email = currentSessionEmail();
  if (email && findUser(email)) window.location.replace("dashboard.html");
}

// ---- Validation ----
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function passwordProblem(password) {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/\d/.test(password)) return "Password must contain at least 1 number.";
  return "";
}

export function setFieldError(inputEl, errorEl, message) {
  errorEl.textContent = message;
  if (message) inputEl.setAttribute("aria-invalid", "true");
  else inputEl.removeAttribute("aria-invalid");
}

export function showNotice(box, message, type) {
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
