const path = require('path')
const express = require('express')
const xss = require('xss')
const ItemsService = require('./items-service')

const itemsRouter = express.Router()
const jsonParser = express.json()

const serializeItem = item => ({
  id: item.id,
  name: xss(item.name),
  list_id: item.list_id
})

itemsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ItemsService.getAllItems(knexInstance)
      .then(items => {
        res.json(items.map(serializeItem))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, list_id } = req.body
    const newItem = { name, list_id }

    for (const [key, value] of Object.entries(newItem))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    newItem.date_added = date_added;

    ItemsService.insertItem(
      req.app.get('db'),
      newItem
    )
      .then(item => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${itemn.id}`))
          .json(serializeItem(item))
      })
      .catch(next)
  })

itemsRouter
  .route('/:item_id')
  .all((req, res, next) => {
    ItemService.getById(
      req.app.get('db'),
      req.params.item_id
    )
      .then(item => {
        if (!item) {
          return res.status(404).json({
            error: { message: `Item doesn't exist` }
          })
        }
        res.item = item
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeComment(res.item))
  })
  .delete((req, res, next) => {
    ItemsService.deleteItem(
      req.app.get('db'),
      req.params.item_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { text, date_added } = req.body
    const itemToUpdate = { text, date_added }

    const numberOfValues = Object.values(itemToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'text' or 'date_added'`
        }
      })

    ItemsService.updateItem(
      req.app.get('db'),
      req.params.item_id,
      itemToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = itemsRouter