const express = require("express");
const geoip = require("geoip-lite2");
const app = express();
const port = 3001;

const blockedCountries = ["China", "North Korea","BD"];
app.set("trust proxy", true);
app.get("/", (req, res) => {
  const ip = "37.111.247.249";
  // const ip = req.ip;
  console.log(ip);
  const geo = geoip.lookup(ip);
  console.log(geo);
  if (geo) {
    if (blockedCountries.includes(geo.country)) {
      res.send("Not avelable in your country.");
    } else {
      res.send(
        {msg:`Hello World! Your IP address is ${ip} and your country is ${geo.country}.`,geo}
      );
    }
  } else {
    res.send("Hello World! Unable to get your IP address and country.");
  }
});

// res.send("hi");

app.listen(port, () => {
  console.log(`ip country finder run on port ${port}!`);
});
