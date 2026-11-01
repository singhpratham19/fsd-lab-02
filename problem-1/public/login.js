// Log in form

const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username === "" || password.trim() === "") {
    loginError.textContent = "Enter your username and password.";
    return;
  }

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });
  const data = await response.json();

  if (!response.ok) {
    loginError.textContent = data.error;
    return;
  }

  loginError.textContent = "";
  loginForm.reset();
  showSession();
});
