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
    ListService.getAllListItemsById(req.app.get('db'), req.params.user_id)
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

  // listRouter
  //   .route('/:list_item_id')
  //   .all(requireAuth)
  //   // .all(checkListItemExists)
  //   // .get((req, res, next) => {
  //   //   ListService.getById(req.app.get('db'), req.params.list_item_id)
  //   //   .then(items => {
  //   //     res.json(items)
  //   //   })
  //   //   .catch(next)
  //   // })
  //   .delete(jsonBodyParser, (req, res, next) => {
  //     const { list_item_id } = req.params
  //     ListService.deleteListItem(req.app.get('db'), list_item_id)
  //       .then(() => {
  //         res.status(204).end()
  //       })
  //       .catch(next)
  //   })

  /* async/await syntax for promises */
  // async function checkListItemExists(req, res, next) {
  //   try {
  //     const listItem = await ListService.getById(
  //       req.app.get('db'),
  //       req.params.list_item_id
  //     )
  //     if (!listItem)
  //       return res.status(404).json({
  //         error: `List item doesn't exist`
  //       })

  //     res.listItem = listItem
  //     next()
  //   } catch (error) {
  //     next(error)
  //   }
  // }



module.exports = listRouter