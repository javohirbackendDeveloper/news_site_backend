const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoDB = require("./libraries/config");
const authRouter = require("./router/auth.routes");
const newsRouter = require("./router/news.routes");
const ensiclopedyRouter = require("./router/ensiclopedy.routes");
const socialRouter = require("./router/social.routes");
const applyRouter = require("./router/apply.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json("Hello world from 4000 port");
});
// ROUTERS

app.use("/api/auth", authRouter);
app.use("/api/news", newsRouter);
app.use("/api/ensiclopedy", ensiclopedyRouter);
app.use("/api/social", socialRouter);
app.use("/api/apply", applyRouter);

mongoDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on the " + PORT);
});

module.exports = app;
