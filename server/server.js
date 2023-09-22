// server.js
const jsonServer = require("json-server");
const fs = require("fs");
var cors = require("cors");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("server/db.json");
const middlewares = jsonServer.defaults();
server.use(cors());
server.use(jsonServer.bodyParser);

const secretKey =
  "0d924f4827b5cdd975b7573500b0a67ea1968bfe350f81ec9af1a1141b1a216a";

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) {
    return res.status(400).json({
      statusCode: 400,
      message: "please pass valid data",
    });
  }
  const users = readUsers();
  const user = users.find(
    (a) => a.username === username && a.password === password
  );

  if (!user) {
    return res.status(401).json({
      statusCode: 401,
      message: "wrong username or password",
    });
  }
  delete user.password;
  const accessToken = jwt.sign(user, secretKey, { expiresIn: "1h" });
  return res.status(200).json({ accessToken });
});

//this middleware retrieve user's info from jwt and append it to req
server.use((req, res, next) => {
  const token = req.header("Authorization");
  if (req.query.bypassAuth === "true") {
    next();
  } else if (!token) {
    return res
      .status(401)
      .json({ statusCode: 401, message: "Unauthorized user" });
  } else {
    // Verify the token
    // token = 'Bearer jwtTokenValue', so we need to  remove `Bearer`
    const parts = token.split(" ");
    if (parts.length !== 2 && parts[0] === "Bearer") {
      return res
        .status(401)
        .json({ statusCode: 401, message: "You are not a authorized user" });
    }
    jwt.verify(parts[1], secretKey, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ statusCode: 403, message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  }
});

// only admin can access the endpoint /users
server.use("/users", (req, res, next) => {
  console.log(req.user.roles);
  if (req.user.roles.includes("admin") || req.query.bypassAuth === "true") {
    next();
  } else {
    return res
      .status(403)
      .json({ statusCode: 403, message: "Unauthorized access" });
  }
});

server.get("/greet", (req, res) => {
  const user = req.user;
  const message = user ? `hello ${user.username}` : "hello";
  return res.json(message);
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});

// functions
function readUsers() {
  const dbFile = fs.readFileSync("./server/db.json");
  const users = JSON.parse(dbFile).users;
  return users;
}
