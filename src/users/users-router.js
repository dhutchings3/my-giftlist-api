const path = require('path')
const express = require('express')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonBodyParser = express.json()


usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { username, name, password } = req.body

    for (const field of ['username', 'name', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    const passwordError = UsersService.validatePassword(password)
    if (passwordError)
      return res.status(400).json({ error: passwordError })

    UsersService.hasUserWithUsername(
      req.app.get('db'),
      username
    )
      .then(hasUserWithUsername => {
        if (hasUserWithUsername)
          return res
            .status(400)
            .json({ error: 'Username already exists, please sign in.' })

        return UsersService.hashPassword(password)
          .then(hashPassword => {
            const newUser = {
              username,
              name,
              password: hashPassword,
            }

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
          })
      })
      .catch(next)
  })

module.exports =usersRouter