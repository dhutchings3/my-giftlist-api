const ListsService = require('../src/lists/lists-service')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe(`Lists service object`, function() {
  let db

  const {
    testUsers,
    testLists,
    testListsItems,
    testUpdatedLists,
  } = helpers.makeFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  // before('cleanup', () => {

  //   return db.raw(
  //     `TRUNCATE
  //       giftlist_lists,
  //       giftlist_items,
  //       giftlist_users
  //       CASCADE
  //     `
  //   )
  //   .then(() => {
  //     console.log('before adding')
  //     return db.into("giftlist_users").insert(testUsers)
  //   })
  //   .then(() => {
  //     return db.into("giftlist_lists").insert(testLists)
  //   })
  //   .then(() => {
  //     return db.into("giftlist_items").insert(testListsItems)
  //   })
  //   .then(() => {
  //     console.log("after adding")
  //   })
  // })

  // after(() => db.destroy());

  describe(`GET /api/lists`, () => {
    context('Given there are lists in the database', () => {
      it(`responds with 200 and all of the lists`, () => {
        return supertest(app)
          .get('/api/lists')
          .expect(200, testLists)
      })
    })
  })

  describe('POST /api/lists', () => {
    it(`adds item to list, responding with 204`, () => {
      const testListsItem = testListsItems[10]
      const name = testListsItems[10].name
      const itemToAdd = {
        list_id: testListsItem.list_id,
        name: name,
      }
      return supertest(app)
        .post('/api/lists')
        .send(itemToAdd)
    })
  })

  // describe(`GET /api/lists/:lists_list_id`, () => {
  //   context(`Given no list items`, () => {
  //     it(`responds with 404`, () => {
  //       const listsItemId = 123
  //       return supertest(app)
  //         .get(`/api/lists/${listsItemId}`)
  //         .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
  //         .expect(404, { error: `List item doesn't exist` })
  //     })
  //   })
  //   context('Given there are list items in the database', () => {
  //     it('responds with 200 and the specified list item', () => {
  //       const listsItemId = 1
  //       const testListsItem = testListsItems[0]
  //       return supertest(app)
  //         .get(`/api/list${listsItemId}`)
  //         .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
  //         .expect(200, testListsItem)
  //     })
  //   })
  // })


  describe(`updateListsItem()`, () => {
    it(`responds 204 when updated list is submitted`, () => {
      return supertest(app)
        .patch(`/api/lists/1`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send({ name: 'test item name' })
        .expect(204)
    })
  })

  describe(`DELETE api/lists/:lists_item_id`, () => {
    console.log(testUsers[0])
    it('responds with 204', () => {
      console.log(testUsers[0])
      const listsItemId = 1
      return supertest(app)
        .delete(`/api/lists/${listsItemId}`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(204)
    })
  })
})