const knex = require('knex')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Auth Endpoints', function() {
  let db

  const { testUsers } = helpers.makeFixtures()
  console.log(testUsers)
  const testUser = testUsers[0]
  console.log(testUsers[0])

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/auth/login`, () => {

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        username: testUser.username,
        password: testUser.password,
      }
      console.log(userValidCreds)
      const expectedToken = jwt.sign(
        { user_id: testUser.id },
        // console.log(testUser.id),
        process.env.JWT_SECRET,
        {
          subject: testUser.username,
          algorithm: 'HS256',
        }
      )
      console.log(expectedToken)
      return supertest(app)
        .post('/api/auth/login')
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken,
        })
    })
  })
})