// server.ts
const express = require("express");
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + "/dist"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

// Start the app by listening on the default port
app.listen(process.env.PORT || 8080);
