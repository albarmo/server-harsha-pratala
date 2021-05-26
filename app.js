const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({ server_status: `running on port ${port}` });
});

app.listen(port, () => {
  console.log(`Running On Port + ${port}`);
});
