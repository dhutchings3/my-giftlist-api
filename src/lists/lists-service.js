const ListsService = {
  getAllLists(knex) {
    return knex.select('*').from('giftlist_lists')
  },
  insertList(knex, newList) {
    return knex
      .insert(newList)
      .into('giftlist_lists')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex.from('giftlist_lists').select('*').where('id', id).first()
  },
  deleteList(knex, id) {
    return knex('giftlist_lists')
      .where({ id })
      .delete()
  },
  updateList(knex, id, newListFields) {
    return knex('giftlist_lists')
      .where({ id })
      .update(newListFields)
  },
}

module.exports = ListsService