const seedData = {
  users() {
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
  },

  lists() {
    return [
      {
        id: 1,
        listcode: "password",
        listname: "Danielle's Christmas List",
        user_id: 1
      }
    ];
  },

  usersWithId() {
    return [
      { id: 1, username: "dhutch3", password: "password", name: "Danielle" },
      { id: 2, username: "MikeObs", password: "password", name: "Mike" },
      { id: 3, username: "Ash", password: "password", name: "Ashley" },
      { id: 4, username: "Steph", password: "password", name: "Stephanie" },
      { id: 5, username: "Pat", password: "password", name: "Patrick" },
      { id: 6, username: "Sam", password: "password", name: "Samantha" },
      { id: 7, username: "Demo", password: "password", name: "Demo" },
      {
        id: 8,
        username: "Test2",
        password: "password",
        name: "Test user"
      },
      {
        id: 9,
        username: "Test3",
        password: "password",
        name: "Testing user"
      }
    ];
  },

  items() {
    return [
      {
        name: "iPad",
        list_id: 1
      },
      {
        name: "Away Carry-on",
        list_id: 1
      },
      {
        name: "Yeti Coffee Mug",
        list_id: 1
      },
      {
        name: "Nintendo Switch",
        list_id: 1
      },
      {
        name: "Pearl Earrings",
        list_id: 1
      }
    ];
  }
};

module.exports = { seedData };
