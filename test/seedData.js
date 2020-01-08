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
        listName: "Danielle's Christmas List",
        items: [
          {
            item: "iPad"
          },
          {
            item: "Away Carry-on"
          },
          {
            item: "Yeti Coffee Mug"
          },
          {
            item: "Nintendo Switch"
          },
          {
            item: "Pearl Earrings"
          }
        ]
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
        item: "iPad"
      },
      {
        item: "Away Carry-on"
      },
      {
        item: "Yeti Coffee Mug"
      },
      {
        item: "Nintendo Switch"
      },
      {
        item: "Pearl Earrings"
      }
    ];
  }
};

module.exports = { seedData };
