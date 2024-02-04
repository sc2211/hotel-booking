const express = require("express");

const app = express();

const path = require("path");

const dbConfig = require("./db");
require('dotenv').config();
const roomsRoute = require("./routes/roomsRoute.js");
const usersRoute = require("./routes/usersRoute");
const bookingsRoute = require("./routes/bookingsRoute");

app.use(express.json());
const cors = require("cors");

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingsRoute);

app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

const port = process.env.PORT || 8000;

if(process.env.NODE_ENV === 'production')
 {
     app.use('/' , express.static('client/build'))

     app.get("*", (req, res) => {

          res.sendFile(path.join(__dirname, 'client/build/index.html'))
       
     });
 }



app.listen(port, () => console.log(`server running on port ${port}`));
