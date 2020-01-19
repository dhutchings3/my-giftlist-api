const express = require('express')
const path = require('path')
const ListsService = require('./lists-service')
const listsRouter = express.Router()
const jsonBodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')


listsRouter
  .route('/')
  .get((req, res, next) => {
    ListsService.getAllListsItems(req.app.get('db'))
      .then(items => {
        res.json(items)
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { item_id, name } = req.body
    const itemToAdd = { item_id, name }

    for (const [key, value] of Object.entries(itemToAdd)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request` }
        })
      }
    }

    itemToAdd.user_id = req.user.id

    ListsService.addToList(req.app.get('db'), itemToAdd)
      .then(item => {
        return ListsService.getById(req.app.get('db'), item.id)
      })
      .then(item => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${item.id}`))
          .json(item)
      })
      .catch(next)
  })


  listsRouter
    .route('/:lists_item_id')
    .all(requireAuth)
    .all(checkListsItemExists)
    .get((req, res, next) => {
      ListsService.getById(req.app.get('db'), req.params.lists_item_id)
      .then(items => {
        res.json(items)
      })
      .catch(next)
    })

    .patch(jsonBodyParser, (req, res, next) => {
      const { item } = req.body
      const itemUpdate = { item }
      const numValues = Object.values(itemUpdate).filter(Boolean).length
        if (numValues === 0) {
          return res.status(400).json({
            error: { message: 'Request must contain either user id, or item id' },
          })
        }
        ListsService.updateListsItem(req.app.get('db'), req.params.lists_item_id, itemUpdate)
          .then(() => {
            res.status(204).end()
          })
          .catch(next)
    })

    .delete(jsonBodyParser, (req, res, next) => {
      const { lists_item_id } = req.params
      ListsService.deleteListsItem(req.app.get('db'), lists_item_id)
        .then(() => {
          res.status(204).end()
        })
        .catch(next)
    })

  /* async/await syntax for promises */
  async function checkListsItemExists(req, res, next) {
    try {
      const listsItem = await ListsService.getById(
        req.app.get('db'),
        req.params.lists_item_id
      )
      if (!listsItem)
        return res.status(404).json({
          error: `Item doesn't exist`
        })

      res.bookshelfItem = bookshelfItem
      next()
    } catch (error) {
      next(error)
    }
  }

module.exports = listsRouter