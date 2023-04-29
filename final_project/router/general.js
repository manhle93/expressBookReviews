const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const {username, password} = req.body
  if(!username || !password){
    return res.status(400).json({message: "username & password is required"});
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  //Write your code here
  const data = await books
  return res.status(200).json(data);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
  //Write your code here
  const isbn = req.params.isbn; 
  const book = await books[isbn]
  return res.status(200).json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
  //Write your code here
  const author = req.params.author
  const data = await books
  const bookArray = Object.values(data)
  const book = bookArray.filter(item => item.author === author)
  return res.status(300).json(book);
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  const title = req.params.title
  const data = await books
  const bookArray = Object.values(data)
  const book = bookArray.filter(item => item.title === title)
  return res.status(300).json(book);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {

  const isbn = req.params.isbn
  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;
