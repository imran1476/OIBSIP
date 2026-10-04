# Login Authentication System (Web Development - Level 2, Task 4)

A front-end only authentication system (Option A of the task): registration, login, a protected
dashboard and logout. Built with vanilla HTML5, CSS3 and JavaScript, using `localStorage` for
user records and `sessionStorage` for the active session.

## How to run

Open `index.html` in a browser (or serve the folder with any static server).
Password hashing uses the Web Crypto API, which needs a secure context: `file://`, `localhost`
and `https` all work in modern browsers.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Login page |
| `register.html` | Registration page |
| `dashboard.html` | Protected page, only visible after login |
| `auth.js` | Shared helpers: storage, hashing, session, validation |
| `login.js`, `register.js`, `dashboard.js` | Page logic |
| `style.css` | Shared styling |

## Checklist

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

## How it works

1. **Register:** validate input, create a random salt, compute `SHA-256(salt + password)`, and save
   `{ email, salt, hash, createdAt }` in `localStorage`.
2. **Login:** find the user, hash the typed password with that user's salt, and compare it with the stored hash.
   On success the email is saved in `sessionStorage`.
3. **Dashboard:** `requireLogin()` checks for a valid session and redirects to `index.html` if there is none.
4. **Logout:** removes the session and redirects to the login page.

## Security notes (important)

This project is for learning. A front-end only system cannot be truly secure:

- Anyone with access to the browser can read `localStorage` and edit `sessionStorage`, so the
  dashboard guard only protects the page in the normal user flow.
- A fast hash like SHA-256 is not ideal for passwords. A real back end should use bcrypt, scrypt or Argon2.
- Real authentication needs a server that verifies credentials and issues secure sessions.

## Testing ideas

1. Register with a short password (error), then without a number (error), then a valid one.
2. Register the same email again (duplicate error).
3. Log in with a wrong password and with an unknown email (same generic message).
4. Open `dashboard.html` in a new tab without logging in (redirects to login).
5. Log in, then press Logout (back to login; dashboard is blocked again).

## Screenshots

Add your screenshots to a `screenshots/` folder in this directory.
