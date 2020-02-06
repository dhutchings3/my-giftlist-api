// const xss = require('xss')

const ListService = {

  getAllListItemsById(db, user_id) {
    return db
      .from('giftlist_list AS list')
      .select(
        'list.id',
        'list.user_id',
        'list.item_id',
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'username', usr.username,
              'first_name', usr.first_name
            )
          ) AS "giftlist_user"`
        ),
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', items.id,
              'item_name', items.item_name,
              'graphic', items.graphic,
              'link', items.link
            )
          ) AS "items"`
        )
      )
      .leftJoin(
        'giftlist_items AS items',
        'list.item_id',
        'items.id'
      )
      .leftJoin(
        'giftlist_users AS usr',
        'usr.id',
        'list.user_id'
      )
      .groupBy('items.id', 'usr.id', 'list.id')
      // .where('user_id', user_id)
  },

  getListByUserId(db, user_id) {
    return db
      .from('giftlist_list')
      .select('*')
      .where('user_id', user_id)
      .then(rows => {
        return rows
      })
    },

  getItemById(db, id) {
    return db
    .from('giftlist_items')
    .select("*")
    .where('id', id)
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

  deleteListItem(db, item_id) {
    return db('giftlist_list')
      .where({ item_id })
      .delete()
  },
}

module.exports = ListService