const knex = require('knex')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Auth Endpoints', function() {
  let db

  let testUsers = [
    {
      username: 'dhutch3',
      password: 'password',
      first_name: 'Danielle'
    },
    {
      username: 'MikeObs',
      password: 'password',
      first_name: 'Mike'
    },
    {
      username: 'Ash',
      password: 'password',
      first_name: 'Ashley'
    },
    {
      username: 'Steph',
      password: 'password',
      first_name: 'Stephanie'
    },
    {
      username: 'Pat',
      password: 'password',
      first_name: 'Patrick'
    },
    {
      username: 'Sam',
      password: 'password',
      first_name: 'Samantha'
    },
    {
      username: 'Demo',
      password: 'password',
      first_name: 'Demo'
    },
  ]

  const testUser = testUsers[0]
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
        giftlist_list,
        giftlist_items
      `
    )
    .then(() => {
      console.log('before adding')
      // insert our test user list into giftlist table
      return db.into('giftlist_users').insert(testUsers)
    })
    .then(() => {
      console.log("after adding")
    })
  })

  after('disconnect from db', () => db.destroy())

  describe.skip(`POST /api/auth/login`, () => {

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        username: testUser.username,
        password: testUser.password,
      }
      const expectedToken = jwt.sign(
        { user_id: testUser.id },
        process.env.JWT_SECRET,
        {
          subject: testUser.username,
          algorithm: 'HS256',
        }
      )
      return supertest(app)
        .post('/api/auth/login')
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken,
        })
    })
  })
})