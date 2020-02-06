const ItemsService = {
  getAllItems(knex) {
    return knex.select('*').from('giftlist_items')
  }
}

module.exports = ItemsService