const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.post("/users", (req, res) => {
  const db = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")));
  const users = db.users || [];
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  db.users = users;
  fs.writeFileSync(path.join(__dirname, "db.json"), JSON.stringify(db));
  res.status(201).json(newUser);
});

server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running on port 4000");
});
