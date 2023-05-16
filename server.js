const http = require("http");
require("dotenv").config();
const app = require("./app");
const server = http.createServer(app);
const port = process.env.PORT || 3000;
console.log(port);
server.listen(port, () => {
  console.log(`Running on port no. is => ${port}`);
});
