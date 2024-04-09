const epxress = require("express");
const mongoose = require("mongoose");
const routerHandler = require("./router-handler/router-handler");
const userHandler = require("./router-handler/user-handler");
const app = epxress();
app.use(epxress.json());

// MongoDB connection with mongoose:
mongoose
  .connect("mongodb://localhost/todo")
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.use("/todos", routerHandler);
app.use("/user", userHandler);

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(3000, () => {
  console.log("CRUD Application with mongoDB");
});
