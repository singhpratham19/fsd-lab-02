// Shows who is logged in and handles log out

const welcome = document.getElementById("welcome-message");
const logoutButton = document.getElementById("logout-button");

async function showSession() {
  const response = await fetch("/api/me");
  const data = await response.json();

  welcome.textContent = data.username ? `Logged in as ${data.username}.` : "";
  logoutButton.hidden = !data.username;
}

logoutButton.addEventListener("click", async () => {
  await fetch("/api/logout", { method: "POST" });
  showSession();
});

showSession();
