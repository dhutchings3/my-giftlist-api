const path = require('path')
const express = require('express')
const xss = require('xss')
const ListsService = require('./lists-service')

const listsRouter = express.Router()
const jsonParser = express.json()

const serializeList = list => ({
  id: list.id,
  listcode: xss(list.listcode),
  listname: xss(list.listname),
  user_id: list.user_id,
})

listsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    ListsService.getAllLists(knexInstance)
      .then(lists => {
        res.json(lists.map(serializeList))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { listname, listcode, user_id } = req.body
    const newList = { listname, listcode, user_id }

    for (const [key, value] of Object.entries(newList))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
    newList.listname = listname
    ListsService.insertList(
      req.app.get('db'),
      newList
    )
      .then(list => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${list.id}`))
          .json(serializeList(list))
      })
      .catch(next)
  })

listsRouter
  .route('/:list_id')
  .all((req, res, next) => {
    ListsService.getById(
      req.app.get('db'),
      req.params.list_id
    )
      .then(list => {
        if (!list) {
          return res.status(404).json({
            error: { message: `List doesn't exist` }
          })
        }
        res.list = list
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeList(res.list))
  })
  .delete((req, res, next) => {
    ListsService.deleteList(
      req.app.get('db'),
      req.params.list_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { listname, listcode, user_id } = req.body
    const listToUpdate = { listname, listcode, user_id }

    const numberOfValues = Object.values(listToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'listname', 'listcode'`
        }
      })

    ListsService.updateList(
      req.app.get('db'),
      req.params.list_id,
      listToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = listsRouter