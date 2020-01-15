const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoints', function() {
  let db

  let testUsers = [
    {
      id: 1,
      username: 'dhutch3',
      password: 'password',
      name: 'Danielle'
    },
    {
      id: 2,
      username: 'MikeObs',
      password: 'password',
      name: 'Mike'
    },
    {
      id: 3,
      username: 'Ash',
      password: 'password',
      name: 'Ashley'
    },
    {
      id: 4,
      username: 'Steph',
      password: 'password',
      name: 'Stephanie'
    },
    {
      id: 5,
      username: 'Pat',
      password: 'password',
      name: 'Patrick'
    },
    {
      id: 6,
      username: 'Sam',
      password: 'password',
      name: 'Samantha'
    },
    {
      id: 7,
      username: 'Demo',
      password: 'password',
      name: 'Demo'
    },
  ]

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    helpers.cleanTables(db)
    return db('giftlist_users')
        .then(() => {
            return db.into('giftlist_users').insert(testUsers)
        })
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe.skip(`POST /api/users`, () => {
    context(`Happy path`, () => {
      it(`responds 201, serialized user, storing bcryped password`, () => {
        const newUser = {
          username: 'test user_name',
          password: '11AAaa!!',
          name: 'test full_name',
        }
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id')
            expect(res.body.username).to.eql(newUser.username)
            expect(res.body.password).to.eql(newUser.password)
            expect(res.body.name).to.eql(newUser.name)
            expect(res.body).to.not.have.property('password')
            expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
          })
          .expect(res =>
            db
              .from('my-giftlist-api')
              .select('*')
              .where({ id: res.body.id })
              .first()
              .then(row => {
                expect(row.username).to.eql(newUser.username)
                expect(row.password).to.eql(newUser.password)
                expect(row.name).to.eql(newUser.name)

                return bcrypt.compare(newUser.password, row.password)
              })
              .then(compareMatch => {
                expect(compareMatch).to.be.true
              })
          )
      })
    })
  })
})