const store = require("../store");
const usersService = {
  userExists(knex, username) {
    console.log(username, "username in userExists");
    return knex
      .select("id")
      .from("giftlist_users")
      .where({ username: username })
      .then(result => {
        console.log("result", result);
        return result;
      });
  },
  getAllusers(knex) {
    console.log("knex in getAllUsers", knex);
    return knex.select("*").from("giftlist_users");
  },
  getUser(knex, username) {
    return knex
      .select("*")
      .from("giftlist_users")
      .where({ username: username });
  },
  getUserId(knex, username) {
    return knex
      .select("id")
      .from("giftlist_users")
      .where({ username: username });
  },

  getNameFromUsername(username) {
    return store.users.find(user => user.username === username).name;
  },
  getUserLists(knex, userid) {
    return knex
      .select("username_id")
      .from("lists")
      .where({ username_id: userid });
  },

  postNewUserNoList(knex, profile) {
    console.log("knex in postNewUserNOList", knex);
    return knex
      .insert(profile)
      .into("giftlist_users")
      .returning("*")
      .then(result => {
        return result;
      });
  },
  changeUsername(knex, username, newusername) {
    return knex("giftlist_users")
      .where({ username })
      .update({ username: newusername })
      .then(() => {
        return knex("giftlist_users").where({ username: newusername });
      });
  },

  changePlayerName(newName, username) {
    store.users.find(user => user.username === username).name = newName;
  },
  postUserWithList: (knex, userObject, listcode) => {
    console.log(userObject, listcode);
  }
};

module.exports = usersService;
