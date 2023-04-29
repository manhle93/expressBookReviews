const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;
var privateKey = "secret";

const app = express();

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/customer/auth/*", function auth(req, res, next) {
  try {
    var bearerToken = req.header("authorization");
    var token = bearerToken.replace("Bearer ","");
    const user = jwt.decode(token, privateKey);
    req.user = user.username
    next();
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: "Please login again" });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
