const express = require('express')
const ItemsService = require('./items-service')
const itemsRouter = express.Router()
const og = require('open-graph')

itemsRouter
  .route('/')
  .get((req, res, next) => {
    ItemsService.getAllItems(req.app.get('db'))
      .then(items => {
        res.json(items)
      })
      .catch(next)
  })

  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    
    const { site_Url } = req.body
    const itemToAdd = { newItem }
    opengraph.getSiteInfo(site_Url, function(err, completeItem) {
      const newItem = completeItem
    }

    for (const [key, value] of Object.entries(itemToAdd)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request` }
        })
      } 
    }

    ItemsService.addToItems(
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
  
module.exports = itemsRouter