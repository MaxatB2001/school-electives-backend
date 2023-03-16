const express = require("express");
const router = require("./router/index.js");
const errorMiddleware = require("./middlewares/errorMiddleware.js");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.json());
app.use(cors());
const PORT = 5000 || 8000;
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`started on port ${PORT}`));
