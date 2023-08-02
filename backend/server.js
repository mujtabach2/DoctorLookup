
import express from "express";
import cors from "cors";
import doctors from "./api/doctors.route.js";
import DoctorsDAO from "./dao/doctorsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import passport from "passport";
import initialize from "./pasport-config.js";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import UsersDAO from "./dao/usersDao.js";
import ejs from "ejs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import mongoose from "mongoose";
const { Schema, model } = mongoose;




let dbClient;

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

initialize(passport, async (email) => {
  const user = await UsersDAO.getUserByEmail(email); // Replace `UsersDAO` with your actual DAO for accessing the users collection
  return user;
}, async (id) => {
  const user = await UsersDAO.getUserById(id); // Replace `UsersDAO` with your actual DAO for accessing the users collection
  return user;
});

const MongoClient = mongodb.MongoClient;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const storeUser = async (userData) => {
  try {
      const review = {
      date: "",
      comment: "",
    };

    const rating = {
      userId: "",
      doctorId: "",
      ratingValue: "",
    };

    const user = {
      id: Date.now().toString(),
      name: userData.first + " " + userData.last,
      email: userData.email,
      password: await bcrypt.hash(userData.password, 10),
      reviews: [review],
      ratings: [rating],
    };

    const db = dbClient.db(process.env.DOCTORS_NS);
    const result = await db.collection("users").insertOne(user);
    console.log("User stored in MongoDB:", result);
    return result;
  } catch (error) {
    console.error("Error storing user in MongoDB:", error);
    throw error;
  }
};






app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error authenticating user:", err);
      return next(err);
    }

    if (!user) {
      req.flash("error", info.message); // Set the flash error message
      return res.redirect("/login"); // Redirect to the login page with the error message
    }

    req.login(user, (err) => {
      if (err) {
        console.error("Error logging in:", err);
        return next(err);
      }

      const serializedUser = JSON.stringify(user);
      const redirectURL = `http://localhost:3000/?user=${encodeURIComponent(serializedUser)}`;
      return res.redirect(redirectURL); // Redirect to the desired page after successful login
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  try {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.clearCookie("connect.sid"); // Clear the session cookie
      res.redirect("http://localhost:3000");
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const result = await storeUser(req.body);
    console.log("User stored in MongoDB:", result);
    res.redirect("/login"); // Redirect to the login page after successful registration
  } catch (error) {
    console.error("Error storing user:", error);
    res.redirect("/register"); // Redirect to the registration page on error
  }
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { messages: { error: req.flash("error") } });
});

app.get(/login/, (req, res) => {
  res.render("login.ejs");
});

app.get(/register/, (req, res) => {
  res.render("register.ejs");
});

app.get("/api/user", (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// Set up MongoDB connection and inject it into DoctorsDAO
MongoClient.connect(process.env.DOCTORS_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async (client) => {
    dbClient = client;
    const db = client.db(); // Access the MongoDB database

    await ReviewsDAO.injectDB(client);
    DoctorsDAO.injectDB(client); // Inject the database connection into DoctorsDAO
    await UsersDAO.injectDB(client); // Inject the database connection into UsersDAO

    app.set("views", path.join(__dirname, "views")); // Set the views directory
    app.set("view engine", "ejs"); // Set EJS as the view engine

    app.use(cors());
    app.use(express.json());
    app.use(methodOverride("_method"));

    app.use("/api/v1/doctors", doctors);
    app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err}`);
    process.exit(1);
  });


export default app;
