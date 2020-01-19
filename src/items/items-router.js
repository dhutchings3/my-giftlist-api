const express = require('express')
const ItemService = require('./items-service')
const itemsRouter = express.Router()

itemsRouter
  .route('/')
  .get((req, res, next) => {
    ItemsService.getAllItems(req.app.get('db'))
      .then(items => {
        res.json(items)
      })
      .catch(next)
  })
module.exports = itemsRouter