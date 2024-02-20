const express = require("express");
const geoip = require("geoip-lite2");
const app = express();
var cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.set("trust proxy", true);
app.post("/", (req, res) => {
  // const ip = "97.111.247.249";
  const ip = req.body.ip;
  console.log(ip);

  const geo = geoip.lookup(ip);
  console.log(geo);
  if (geo) {
    res
      .send({ message: `your country api working`, country: geo.country })
      .status(200);
  } else {
    res
      .send({
        message: `Hello World! Unable to get your IP address and country.`,
      })
      .status(401);
  }
});

// res.send("hi");

app.listen(port, () => {
  console.log(`ip country finder run on port ${port}!`);
});
