import {
  redirectIfLoggedIn,
  findUser,
  hashingAvailable,
  createSalt,
  hashPassword,
  getUsers,
  saveUsers,
  setFieldError,
  showNotice,
  passwordProblem,
  isValidEmail,
} from "./auth.js";

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
