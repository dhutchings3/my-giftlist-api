require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const listRouter = require('./list/list-router')
const usersRouter = require('./users/users-router')
const itemsRouter = require('./items/items-router')
const authRouter = require('./auth/auth-router')
const { requireAuth } = require('./middleware/jwt-auth')

const app = express()

const morganOption = (NODE_ENV === 'production'
  ? 'tiny' 
  : 'common')

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.use("/api/auth", authRouter);
app.use("/api/items", itemsRouter);
app.use("/api/users", usersRouter);


app.use(requireAuth)
app.use("/api/list", listRouter);


app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response; console.log(error)
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
