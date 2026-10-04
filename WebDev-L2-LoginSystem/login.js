import {
  redirectIfLoggedIn,
  findUser,
  hashingAvailable,
  hashPassword,
  startSession,
  setFieldError,
  showNotice,
} from "./auth.js";

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
