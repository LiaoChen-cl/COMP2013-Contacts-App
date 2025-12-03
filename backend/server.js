// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { DB_URI, SECRET_KEY } = process.env;

// Models
const Contact = require("./models/contact");
const User = require("./models/user");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// ----------------- Routes -----------------

// Root
app.get("/", (req, res) => {
  res.send("Server is live!");
});

// ---------- Contacts CRUD ----------

// GET all contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// POST new contact
app.post("/contacts", async (req, res) => {
  const { name, email, address, phone, image } = req.body;
  const newContact = new Contact({
    name,
    contact: { email, address, phone },
    image,
  });
  try {
    await newContact.save();
    res.status(200).send({ message: "Contact added successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// DELETE contact
app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Contact.findByIdAndDelete(id);
    res.send({ message: "Contact deleted" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// GET one contact by id
app.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    res.send(contact);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// PATCH contact
app.patch("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, address, phone, image } = req.body;
  try {
    await Contact.findByIdAndUpdate(id, {
      name,
      contact: { email, address, phone },
      image,
    });
    res.send({ message: "Contact updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// ---------- User Auth ----------

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.send({ message: "User created!" });
  } catch (error) {
    res.status(500).send({
      message: "User already exists, choose another username",
    });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).send({ message: "User does not exist" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(403).send({ message: "Incorrect username or password" });

    const token = jwt.sign({ id: user._id, username }, SECRET_KEY);
    res.status(201).send({ message: "User Authenticated", token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
