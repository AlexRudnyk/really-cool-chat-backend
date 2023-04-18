const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const { PRIVATE_KEY } = process.env;

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const result = await axios.put(
      "https://api.chatengine.io/users/",
      { username, secret: username, first_name: username },
      { headers: { "private-key": `${PRIVATE_KEY}` } }
    );
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(error.response.status).json(error.response.data);
  }
});

app.listen(3001);
