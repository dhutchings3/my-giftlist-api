// const xss = require('xss')
const xss = require('xss')

const ListService = {

  getAllListItems(db) {
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

  serializeListItem(listItem) {
    const { giftlist_user, usr } = listItem
    return {
      id: listItem.id,
      item_name: listItem.item_name,
      graphic: listItem.graphic,
      link: listItem.link
    }
  },

}

module.exports = ListService