const express = require('express')
const ItemsService = require('./items-service')
const itemsRouter = express.Router()
const jsonBodyParser = express.json()
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

  .post(jsonBodyParser, (req, res, next) => {
    
    const { site_Url } = req.body
    // const itemToAdd = { newItem }
    og(site_Url, function(err, completeItem) {
      if (err) return res.json(err)
      // console.log(completeItem)
      const newItem = {
        item_name: completeItem.title,
        graphic: completeItem.image.url,
        link: completeItem.url
      }

    ItemsService.addToItems(
    req.app.get('db'), 
    newItem
    )
      .then(item => {
        res
          .status(201)
          .json(newItem)
      })
      .catch(next)
  })
})

module.exports = itemsRouter