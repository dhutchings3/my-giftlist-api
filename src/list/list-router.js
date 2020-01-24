const express = require('express')
const path = require('path')
const ListService = require('./list-service')
const listRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')

listRouter
  .route('/')
  .get((req, res, next) => {
    ListService.getAllListItems(req.app.get('db'))
      .then(items => {
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

    ListService.addToList(req.app.get('db'), itemToAdd)
      .then(item => {
        return ListService.getById(req.app.get('db'), item.id)
      })
      .then(item => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${item.id}`))
          .json(item)
      })
      .catch(next)
  })

  listRouter
    .route('/:list_item_id')
    .all(requireAuth)
    .all(checkListItemExists)
    .get((req, res, next) => {
      ListService.getById(req.app.get('db'), req.params.list_item_id)
      .then(items => {
        res.json(items)
      })
      .catch(next)
    })

    .delete(jsonBodyParser, (req, res, next) => {
      const { list_item_id } = req.params
      ListService.deleteListItem(req.app.get('db'), list_item_id)
        .then(() => {
          res.status(204).end()
        })
        .catch(next)
    })

  /* async/await syntax for promises */
  async function checkListItemExists(req, res, next) {
    try {
      const listItem = await ListService.getById(
        req.app.get('db'),
        req.params.list_item_id
      )
      if (!listItem)
        return res.status(404).json({
          error: `List item doesn't exist`
        })

      res.listItem = listItem
      next()
    } catch (error) {
      next(error)
    }
  }



module.exports = listRouter