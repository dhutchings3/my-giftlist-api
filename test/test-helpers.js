const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        { username: "dhutch3", password: "password", name: "Danielle" },
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

function makeListsArray() {
    return [
      {
        id: 1,
        listname: 'Dees Christmas List',
        user_id: 1
      },
      // {
      //   id: 2,
      //   listname: 'Mikes Christmas List',
      //   user_id: 2
      // },
      // {
      // id: 3,
      //   listname: 'Ashs Christmas List',
      //   user_id: 3
      // },
      // {
      //   id: 4,
      //     listname: 'Stephs Christmas List',
      //     user_id: 4
      // },
      // {
      //   id: 5,
      //     listname: 'Hals Christmas List',
      //     user_id: 5
      // },
      // {
      //   id: 6,
      //     listname: 'RJs Christmas List',
      //     user_id: 6
      // },
      // {
      //   id: 7,
      //     listname: 'Pats Christmas List',
      //     user_id: 7
      // },
    ]
  }

  function makeItemsArray() {
    return [
      { id: 1,
        name: 'Apple TV',
        list_id: 1
      },
      { id: 1,
        name: 'Perfume',
        list_id: 1
      },
      { id: 1,
        name: 'Slippers',
        list_id: 1
      },
      { id: 1,
        name: 'Yeti Mug',
        list_id: 1
      },
      { id: 2,
        name: 'iPad',
        list_id: 2
      },
      { id: 2,
        name: 'Xbox games',
        list_id: 2
      },
      { id: 2,
        name: 'Portable phone charger',
        list_id: 2
      },
      { id: 2,
        name: 'Leather wallet',
        list_id: 2
      },
      { id: 2,
        name: 'Slippers',
        list_id: 2
      },
      { id: 2,
        name: 'iPhone case',
        list_id: 2
      },
      { id: 3,
        name: 'iPhone case',
        list_id: 3
      },
      { id: 3,
        name: 'iPhone case',
        list_id: 3
      },
      { id: 3,
        name: 'Fleece Pajamas',
        list_id: 3
      },
      { id: 3,
        name: 'Nespresso Coffee Maker',
        list_id: 3
      },
      { id: 3,
        name: 'Winter Boots',
        list_id: 3
      },
      { id: 4,
        name: 'iPad',
        list_id: 4
      },
      { id: 4,
        name: 'Heated Blanket',
        list_id: 4
      },
      { id: 4,
        name: 'Running Shoes',
        list_id: 4
      },
      { id: 4,
        name: 'Air Fryer',
        list_id: 4
      },
      { id: 4,
        name: 'Headphones',
        list_id: 4
      },
      { id: 5,
        name: 'Gold necklace',
        list_id: 5
      },
      { id: 5,
        name: 'Sweater',
        list_id: 5
      },
      { id: 5,
        name: 'Purse',
        list_id: 5
      },
      { id: 5,
        name: 'Perfume',
        list_id: 5
      },
      { id: 5,
        name: 'Yeti Mug',
        list_id: 5
      },
      { id: 6,
        name: 'iPhone',
        list_id: 6
      },
      { id: 6,
        name: 'Leather wallet',
        list_id: 6
      },
      { id: 6,
        name: 'Slippers',
        list_id: 6
      },
      { id: 6,
        name: 'Winter Coat',
        list_id: 6
      },
      { id: 6,
        name: 'Nintendo Switch',
        list_id: 6
      },
      { id: 7,
        name: 'Luggage',
        list_id: 7
      },
      { id: 7,
        name: 'Cologne',
        list_id: 7
      },
      { id: 7,
        name: 'Slippers',
        list_id: 7
      },
      { id: 7,
        name: 'Yeti Mug',
        list_id: 7
      },
      { id: 7,
        name: 'Automatic Car Starter',
        list_id: 7
      },
    ]
  }



  function makeFixtures() {
    const testUsers = makeUsersArray()
    const testLists = makeListsArray()
    const testListsItems = makeItemsArray()

    return { testUsers, testLists, testListsItems }
  }
  
    

function cleanTables(db) {
  return db.raw(
      `TRUNCATE
        giftlist_users,
        giftlist_lists,
        giftlist_items
        CASCADE  
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
          `SELECT setval('giftlist_users_id_seq', ?)`,
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
  makeItemsArray,
  seedUsers,
  makeFixtures,
  cleanTables,
  makeAuthHeader,
}
