const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        { username: "dhutch3", password: "password", name: "Danielle" },
        { username: "MikeObs", password: "password", name: "Mike" },
        { username: "Ash", password: "password", name: "Ashley" },
        { username: "Steph", password: "password", name: "Stephanie" },
        { username: "Pat", password: "password", name: "Patrick" },
        { username: "Sam", password: "password", name: "Samantha" },
        { username: "Demo", password: "password", name: "Demo" },
        {
          username: "Test2",
          password: "password",
          name: "Test user"
        },
        {
          username: "Test3",
          password: "password",
          name: "Testing user"
        }
      ];
}

function makeListsArray() {
    return [
      {
        id: 1,
        listname: 'Dees Christmas List',
        user_id: 1
      },
      {
        id: 2,
        listname: 'Mikes Christmas List',
        user_id: 2
      },
      {
      id: 3,
        listname: 'Ashs Christmas List',
        user_id: 3
      },
      {
        id: 4,
          listname: 'Stephs Christmas List',
          user_id: 4
      },
      {
        id: 5,
          listname: 'Hals Christmas List',
          user_id: 5
      },
      {
        id: 6,
          listname: 'RJs Christmas List',
          user_id: 6
      },
      {
        id: 7,
          listname: 'Pats Christmas List',
          user_id: 7
      },
    ]
  }

  function makeFixtures() {
    const testUsers = makeUsersArray()
    const testLists = makeListsArray()

    return { testUsers, testLists }
  }
  
    

function cleanTables(db) {
  return db.raw(
      `TRUNCATE
        giftlist_users,
        giftlist_lists,
        giftlist_items  
        `
    )
  }
  
  function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('giftlist_users').insert(preppedUsers)
      .then(() =>
        // update the auto sequence to stay in sync
        db.raw(
          `SELECT setval('bookery_users_id_seq', ?)`,
          [users[users.length - 1].id],
        )
      )
  }


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeListsArray,
  seedUsers,
  makeFixtures,
  cleanTables,
  makeAuthHeader,
}
