const express = require("express");
const geoip = require("geoip-lite2");
const app = express();
var cors = require('cors')
const port = 3001;
app.use(express.json());
app.use(cors())
app.set("trust proxy", true);
app.post("/", (req, res) => {
  const blockedCountries = ["China", "North Korea"];
  // const ip = "37.111.247.249";
  const ip = req.body.ip;

  console.log(ip)
  
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
