// const ListService = require('../src/list/list-service')
const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe(`Lists service object`, function() {
  let db

  const {
    testUsers,
    testList,
    testItems,
    testListItems,
    // testUpdatedList,
  } = helpers.makeFixtures()


  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  before('cleanup', () => {

  return db.raw(
      `TRUNCATE
        giftlist_users,
        giftlist_items,
        giftlist_list
        RESTART IDENTITY CASCADE  
        `
    )
    .then(() => {
      return db.into("giftlist_users").insert(testUsers)
    })
    .then(() => {
      return db.into("giftlist_items").insert(testItems)
    })
    .then(() => {
      return db.into("giftlist_list").insert(testList)
    })
    .then(() => {
    })
  })

  after(() => db.destroy());

  describe(`GET /api/list`, () => {
    context('Given there are lists in the database', () => {
      it(`responds with 200 and all of the lists`, () => {
        return supertest(app)
          .get('/api/list')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, testListItems)
      })
    })
  })

  describe(`POST /api/list`, () => {
    it(`adds item to list, responding with 204`, () => {
      const testListItem = testListItems[0]
      const itemToAdd = {
        list_id: testListItem.list_id
      }
      return supertest(app)
        .post('/api/list')
        .send(itemToAdd)
    })
  })

  describe(`DELETE api/list/:list_item_id`, () => {
    it('responds with 204', () => {
      const list_item_id = 1
      return supertest(app)
        .delete(`/api/list/${list_item_id}`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(204)
    })
  })
})