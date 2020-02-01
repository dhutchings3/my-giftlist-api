// const xss = require('xss')

const ListService = {

  getAllListItems(db, user_id) {
    return db
      .from('giftlist_list')
      .select('*')
      .where({ user_id })
      .then(rows => {
        return rows
      })
  },

  getById(db, id) {
    return ListService.getAllListItems(db)
      .where('list.id', id)
      .first()
  },

  addToList(db, itemToAdd) {
    return db
      .insert(itemToAdd)
      .into('giftlist_list')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deleteListItem(db, id) {
    return ListService.getById(db, id)
      .where('id', id)
      .delete()
  },
}

module.exports = ListService