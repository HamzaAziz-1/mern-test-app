const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes")
const serverless = require("serverless-http");

//middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", postRoutes);

//http server
const PORT = process.env.PORT || 8000;

app.get("/api/v1/hello", (req, res) => {
  res.send({ app: "aws-nodejs-lambda-function", version: "1.0.0" });
});

// add the handler for our lambda function
// module.exports.handler = serverless(app);

app.listen(process.env.PORT,function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})