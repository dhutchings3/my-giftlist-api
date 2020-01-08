const helpers = {
    seedUsers(db, users) {
      console.log("seedUsers Ran");
      return db.into("giftlist_users").insert(users);
    },
  
    seedLists(db, lists) {
      console.log("seedLists ran");
      return db.into("giftlis_lists").insert(lists);
    },
  
  
    seedAllTables(
      db,
      users,
      lists,
      items,
    ) {
      seedUsers(db, users);
      seedLists(db, lists);
      seedItems(db, items)
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