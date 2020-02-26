const ItemsService = {
  getAllItems(knex) {
    return knex.select('*').from('giftlist_items')
  },

  addToItems(db, itemToAdd) {
    return db
      .insert(itemToAdd)
      .into('giftlist_items')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
}


module.exports = ItemsService