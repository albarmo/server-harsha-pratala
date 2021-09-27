const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const routes = require("./routes/index");

app.use(cors());
app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ server_status: `running on port ${port}` });
});

app.use(routes);

// Define the static file path
app.use(express.static(__dirname + "/public/uploads"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`🔥🔥🔥 Server running on port ${port}`);
});
