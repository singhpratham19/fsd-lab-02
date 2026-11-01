const express = require("express");
const session = require("express-session");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 3001;

// Connection to the MySQL database
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_db",
});

app.use(express.json());
app.use(express.static("public"));

// Session: the browser keeps only a session ID in a cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fsd-lab-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 1000 },
  })
);

// Server-side validation: the same rules as the browser
function validate({ username, email, phone, password }) {
  if (!username || username.trim() === "") return "Enter a username.";
  if (!/^[A-Za-z][A-Za-z0-9._]+@[A-Za-z]{3}\.[A-Za-z]{2,3}$/.test(email)) {
    return "Use the format name@abc.com.";
  }
  if (!/^[0-9]{10}$/.test(phone)) return "Phone number must be exactly 10 digits.";
  if (
    typeof password !== "string" ||
    password.length < 7 ||
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[&,$#@]/.test(password)
  ) {
    return "Password does not meet the rules.";
  }
  return "";
}

// Register a student
app.post("/api/register", async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    const error = validate(req.body);
    if (error) return res.status(400).json({ error: error });

    const passwordHash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO students (username, email, phone, password_hash) VALUES (?, ?, ?, ?)",
      [username.trim(), email, phone, passwordHash]
    );

    req.session.username = username.trim();
    res.status(201).json({ username: username.trim() });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "That username or email is already registered." });
    }
    next(error);
  }
});

// Log in
app.post("/api/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query("SELECT * FROM students WHERE username = ?", [username]);
    const student = rows[0];

    if (!student || !(await bcrypt.compare(String(password), student.password_hash))) {
      return res.status(401).json({ error: "Wrong username or password." });
    }

    req.session.username = student.username;
    res.json({ username: student.username });
  } catch (error) {
    next(error);
  }
});

// Check who is logged in
app.get("/api/me", (req, res) => {
  res.json({ username: req.session.username || null });
});

// Log out
app.post("/api/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out." });
  });
});

// Runs when a database query fails
app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).json({ error: "Server error. Is MySQL running?" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
