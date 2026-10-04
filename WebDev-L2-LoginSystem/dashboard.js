import { requireLogin, endSession } from "./auth.js";

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
