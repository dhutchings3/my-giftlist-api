const express = require("express");
const store = require("../store");
// const usersService = require("../users/users-service");
const listsService = {
  doesExist(knex, listcode) {
    return knex
      .select("id")
      .from("giftlist_users")
      .where({ listcode: listcode });
  },
  getAllLists(knex) {
    return knex.select("*").from("giftlist_lists");
  },
  getList(listcode) {
    return store.lists.find(list => list.listcode === listcode);
  },
  userExists(username) {
    return store.users.map(user => user.username).includes(username);
  },
  postNewList(listObject) {
    store.lists.push(listObject);
  },
  addToList(item) {
    const newItem = {
      item: item.name
    };
    store.lists.find(list => list.listcode === listcode).items.push(newItem);
  }
};

module.exports = listsService;
