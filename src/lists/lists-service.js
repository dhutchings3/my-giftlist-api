// const xss = require('xss')
const knex = require("knex");

const ListsService = {

  getAllListsItems(db) {
    return db.select('*').from('giftlist_items').where(user_id, list_id)
  },

  getById(db, id) {
    return ListsService.getAllListsItems(db)
      .where('lists.id', id)
      .first()
  },

  addToLists(db, itemToAdd) {
    return db
      .insert(itemToAdd)
      .into('giftlist_items')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  insertItem(db, newItem) {
    return db
      .insert(newItem)
      .into('giftlist_items')
  },

  updateListsItem(db, id, newItemFields) {
    return db('giftlist_items')
      .where('id', id)
      .update(newItemFields)
  },

  deleteListsItem(db, id) {
    return ListsService.getById(db, id)
      .where('id', id)
      .delete()
  },

  serializeListsItem(listsItem) {
    const { name } = listsItem
    return {
      id: listsItem.id,
      name: listsItem.name,
    }
  },

}

module.exports = ListsService