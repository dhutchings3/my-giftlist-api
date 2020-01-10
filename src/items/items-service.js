const ItemsService = {
    getAllItems(knex) {
      return knex.select('*').from('giftlist_items')
    },
  
    insertItem(knex, newItem) {
      return knex
        .insert(newItem)
        .into('giftlist_items')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
    },
  
    getById(knex, id) {
      return knex
        .from('giftlist_items')
        .select('*')
        .where('id', id)
        .first()
    },
  
    deleteItem(knex, id) {
      return knex('giftlist_items')
        .where({ id })
        .delete()
    },
  
    updateItem(knex, id, newItemFields) {
      return knex('giftlist_items')
        .where({ id })
        .update(newItemFields)
    },
  }
  
  module.exports = ItemsService