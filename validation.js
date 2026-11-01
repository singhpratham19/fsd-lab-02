// External JavaScript: student registration form validation

const phonePattern = /^[0-9]{10}$/;
const emailPattern = /^[A-Za-z][A-Za-z0-9._]+@[A-Za-z]{3}\.[A-Za-z]{2,3}$/;

function getValue(id) {
  return document.getElementById(id).value;
}

function isEmpty(value) {
  return value.trim() === ""; // spaces alone count as empty
}

function validatePassword(password) {
  if (password.length < 7) return "Password must be at least 7 characters.";
  if (!/[A-Z]/.test(password)) return "Password needs a capital letter.";
  if (!/[0-9]/.test(password)) return "Password needs a digit.";
  if (!/[&,$#@]/.test(password)) return "Password needs one of & , $ # @.";
  return "";
}

function getErrors() {
  const username = getValue("username");
  const email = getValue("email");
  const phone = getValue("phone");
  const password = getValue("password");
  const confirmPassword = getValue("confirm-password");
  const errors = {};

  if (isEmpty(username)) errors.username = "Enter a username.";

  if (isEmpty(email)) errors.email = "Enter your email.";
  else if (!emailPattern.test(email.trim())) errors.email = "Use the format name@abc.com.";

  if (isEmpty(phone)) errors.phone = "Enter your phone number.";
  else if (!phonePattern.test(phone.trim())) errors.phone = "Phone number must be exactly 10 digits.";

  if (isEmpty(password)) errors.password = "Enter a password.";
  else if (validatePassword(password)) errors.password = validatePassword(password);

  if (isEmpty(confirmPassword)) errors["confirm-password"] = "Confirm your password.";
  else if (password !== confirmPassword) errors["confirm-password"] = "Passwords do not match.";

  return errors;
}

// Cookie and session storage: remember the username, never the password
function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : "";
}

function rememberStudent(username) {
  document.cookie = `student=${encodeURIComponent(username)}; max-age=86400; path=/; SameSite=Lax`;
  sessionStorage.setItem("loggedIn", "true");
}

function showWelcome() {
  const student = getCookie("student");
  const status = sessionStorage.getItem("loggedIn") ? "logged in this session" : "saved in a cookie";
  document.getElementById("welcome-message").textContent = student
    ? `Welcome back, ${student} (${status}).`
    : "";
}

const form = document.getElementById("registration-form");
const success = document.getElementById("success-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const errors = getErrors();
  const fields = ["username", "email", "phone", "password", "confirm-password"];

  fields.forEach((id) => {
    document.getElementById(`${id}-error`).textContent = errors[id] || "";
    document.getElementById(id).classList.toggle("invalid", Boolean(errors[id]));
  });

  if (Object.keys(errors).length > 0) {
    success.textContent = "";
    document.getElementById(fields.find((id) => errors[id])).focus();
    return;
  }

  const username = getValue("username").trim();
  rememberStudent(username);
  showWelcome();
  success.textContent = `${username} is registered.`;
  form.reset();
});

showWelcome();
