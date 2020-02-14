const express = require('express')
const path = require('path')
const ListService = require('./list-service')
const { requireAuth } = require('../middleware/jwt-auth')
const UsersService = require('../users/users-service')

const listRouter = express.Router()
const jsonBodyParser = express.json()

listRouter
  .route('/')
  .get((req, res, next) => {
    // console.log(user_id, 'user id')
    ListService.getAllListItemsById(req.app.get('db'), req.params.user_id)
    // console.log(req.user_id, 'user id after')
    .then(items => {
      console.log(items, 'items list after')
      res.json(items)
    })
    .catch(next)
  })

  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    
    const { item_id } = req.body
    const itemToAdd = { item_id }

    for (const [key, value] of Object.entries(itemToAdd)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request` }
        })
      } 
    }

    itemToAdd.user_id = req.user.id
    console.log(req.user)

    ListService.addToList(
    req.app.get('db'), 
    itemToAdd
    )
      .then(item => {
        res
          .status(201)
          .send(itemToAdd)
      })
      .catch(next)
  })

  listRouter
  .route('/:item_id')
  .delete((req, res, next) => {
// console.log(req.params)
const { item_id } = req.params
console.log(item_id)
    ListService.deleteListItem(
      req.app.get('db'),
      req.params.item_id)

      .then(item => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = listRouter