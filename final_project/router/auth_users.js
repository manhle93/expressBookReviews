const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();
var privateKey = "secret";
let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "manhle" || password === "12345678") {
    var token = jwt.sign({ username }, privateKey);
    return res.status(300).json({ token });
  }
  return res.status(400).json({ message: "username & password is required" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const user = req.user;
  const review = req.body.review;
  const isbn = req.params.isbn;
  const book = books[isbn];
  if(!book){
    return res.status(404).json({ message: "Book not found" });
  }
  book.reviews[user] = review
  return res.status(200).json(book);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  const user = req.user;
  const isbn = req.params.isbn;
  const book = books[isbn];
  if(!book){
    return res.status(404).json({ message: "Book not found" });
  }
  const reviews = book.reviews;
  delete reviews[user];
  book.reviews = reviews;
  return res.status(200).json({message: "Deleted"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
