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

const form = document.getElementById("registration-form");
const success = document.getElementById("success-message");
const serverError = document.getElementById("server-error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const errors = getErrors();
  const fields = ["username", "email", "phone", "password", "confirm-password"];

  fields.forEach((id) => {
    document.getElementById(`${id}-error`).textContent = errors[id] || "";
    document.getElementById(id).classList.toggle("invalid", Boolean(errors[id]));
  });

  success.textContent = "";
  serverError.textContent = "";

  if (Object.keys(errors).length > 0) {
    document.getElementById(fields.find((id) => errors[id])).focus();
    return;
  }

  // Send the valid data to the server, which saves it in MySQL
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: getValue("username").trim(),
      email: getValue("email").trim(),
      phone: getValue("phone").trim(),
      password: getValue("password"),
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    serverError.textContent = data.error;
    return;
  }

  success.textContent = `${data.username} is registered.`;
  form.reset();
  showSession();
});
