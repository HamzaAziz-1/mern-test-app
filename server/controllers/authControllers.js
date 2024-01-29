const db = require("../database/db");
const {
  comparePassword,
  hashPassword,
  attachCookiesToResponse,
} = require("../utils/index");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("Please provide name, email, and password");
    }

    const hashedPassword = await hashPassword(password);

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.execute(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).send("Error while registering the user");
      }
      res.status(201).send("User registered successfully");
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please provide email and password");
    }

    const query = "SELECT * FROM users WHERE email = ?";
    db.execute(query, [email], async (err, users) => {
      if (err) {
        return res.status(500).send("Error while logging in");
      }
      if (
        users.length === 0 ||
        !(await comparePassword(password, users[0].password))
      ) {
        return res.status(401).send("Invalid credentials");
      }
      const user = users[0];
      attachCookiesToResponse({ res, user });

      res.status(200).json({ message: "Logged in successfully", user });
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(200).json({ message: "user logged out!" });
};
module.exports = { login, register, logout };
