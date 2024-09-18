const express = require("express");

const PORT = 8081;

const app = express();

app.listen(PORT, () => {
  console.log("app is listening in ", PORT);
});
