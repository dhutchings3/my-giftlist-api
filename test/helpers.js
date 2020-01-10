  const helpers = {
    seedUsers(db, users) {
      return db.into("giftlist_users").insert(users);
    },
  
    seedLists(db, lists) {
      return db.into("giftlist_lists").insert(lists);
    },

    seedItems(db, items) {
      return db.into("giftlist_items").insert(items);
    },

    expectedList() {
      return {
        id: 1,
        listcode: "password",
        listname: "Danielle's Christmas List",
        user_id: 1
      };
    },

    newList() {
      return {
        id: 11,
        listcode: "password",
        listname: "Colleen's Christmas List",
        user_id: 11
      };
    },

    testList() {
      return {
        id: 14,
        listcode: "password",
        listname: "Cody's Christmas List",
        user_id: 14
      };

    },

    expectedLists() {
      return [
        {
          id: 1,
          listcode: 'password',
          listname: 'Dees Christmas List',
          user_id: 1
        },
        {
          id: 2,
          listcode: 'password',
          listname: 'Mikes Christmas List',
          user_id: 2
        },
        {
        id: 3,
          listcode: 'password',
          listname: 'Ashs Christmas List',
          user_id: 3
        },
        {
          id: 4,
            listcode: 'password',
            listname: 'Stephs Christmas List',
            user_id: 4
        },
        {
          id: 5,
            listcode: 'password',
            listname: 'Hals Christmas List',
            user_id: 5
        },
        {
          id: 6,
            listcode: 'password',
            listname: 'RJs Christmas List',
            user_id: 6
        },
        {
          id: 7,
            listcode: 'password',
            listname: 'Pats Christmas List',
            user_id: 7
        },
      ]
    },

    expectedItems() {
      return [
        { name: "Apple TV" },
        { name: "iPhone" },
        { name: "slippers"}
      ];
    },
    testUser() {
      return { username: "dhutch3", password: "password", nickname: "Danielle" };
    },
  
  
    seedAllTables(
      db,
      users,
      lists,
      items,
    ) {
      return this.seedUsers(db, users).then(() => {
        return this.seedLists(db, lists).then(() => {
          return this.seedItems(db, items).then(() => {
          })
        })
      })
    }
  };

  function cleanTables(db) {
    return db.raw(
      `TRUNCATE 
    giftlist_users,
    giftlist_lists,
    giftlist_items
    RESTART IDENTITY CASCADE`
    );
  }

  function makeAuthHeader(user) {
    const token = Buffer.from(`${user.username}:${user.password}`).toString(
      "base64"
    );
    return `Basic ${token}`;
  }
  
  module.exports = {
    helpers,
    cleanTables,
    makeAuthHeader
  };