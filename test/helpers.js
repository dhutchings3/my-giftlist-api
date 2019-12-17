const helpers = {
    seedUsers(db, users) {
      console.log("seedUsers Ran");
      return db.into("giftlist_users").insert(users);
    },
  
    seedTeams(db, lists) {
      console.log("seedLists ran");
      return db.into("giftlis_lists").insert(lists);
    },
  
    seedLocations(db, locations) {},
  
    seedAllTables(
      db,
      users,
      lists
    ) {
      seedUsers(db, users);
      seedLists(db, lists);
    }
  };
  
  function cleanTables(db) {
    return db.raw(
      `TRUNCATE 
    giftlist_users,
    giftlist_lists,
    RESTART IDENTITY CASCADE`
    );
  }
  
  module.exports = {
    helpers,
    cleanTables
  };