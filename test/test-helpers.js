const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        { 
          id: 1, 
          username: "dhutch3", 
          password: "password", 
          first_name: "Danielle" 
        }
        // { username: "MikeObs", password: "password", name: "Mike" },
        // { username: "Ash", password: "password", name: "Ashley" },
        // { username: "Steph", password: "password", name: "Stephanie" },
        // { username: "Pat", password: "password", name: "Patrick" },
        // { username: "Sam", password: "password", name: "Samantha" },
        // { username: "Demo", password: "password", name: "Demo" },
        // {
        //   username: "Test2",
        //   password: "password",
        //   name: "Test user"
        // },
        // {
        //   username: "Test3",
        //   password: "password",
        //   name: "Testing user"
        // }
      ];
}

function makeListArray(users, items) {
    return [
      {
        id: 1,
        user_id: users[0].id,
        item_id: items[0].id
      }
    ]
  }


function makeListItemsArray(users, items) {
  return [
    {
      id: 1,
      user_id: users[0].id,
      item_id: items[0].id,
      review:"test review 1",
      rating: 3,
      giftlist_user: {
        id: 1,
          username: "Test1",
          first_name: "Test"

      },
      items: {
        id: 1,
        item_name: 'Test Item 1',
        graphic: 'https://testimage.com',
        link: 'https://wwww,buyitemhere.com'
      }
    }
  ]
}

  function makeItemsArray() {
    return [
      {
        id: 1,
        item_name: 'Test Item 1',
        graphic: 'https://testimage.com',
        link: 'https://wwww,buyitemhere.com'
      }
    ]
  }



  function makeFixtures() {
    const testUsers = makeUsersArray()
    const testItems = makeItemsArray()
    const testList = makeListArray(testUsers, testItems)
    const testListItems = makeListItemsArray(testUsers, testItems)

    return { testUsers, testList, testItems, testListItems }
  }
  
    

function cleanTables(db) {
  return db.raw(
      `TRUNCATE
        giftlist_users,
        giftlist_items,
        giftlist_list
        RESTART IDENTITY CASCADE  
        `
    )
  }
  
  function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('giftlist_users').insert(preppedUsers)
  }


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: 'HS256'
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeListArray,
  makeItemsArray,
  makeListItemsArray,
  seedUsers,
  makeFixtures,
  cleanTables,
  makeAuthHeader
}
