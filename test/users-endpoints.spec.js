const knex = require("knex");
const app = require("../src/app");
const { helpers } = require("./helpers");
const { seedData } = require("./seedData");
const { cleanTables } = require("./helpers");
require("dotenv").config();

describe.only("Users Endpoints", function() {
  let db;
  const users = seedData.users();
  const lists = seedData.lists();

  const testUser = {
    username: "dhutch3",
    name: "Danielle",
    password: "password"
  };

  const newUser = {
    username: "MikeObs",
    password: "password",
    name: "Mike"
  };

  before("make knex instance", () => {
    console.log(process.env.TEST_DB_URL);
    db = knex({
      client: "pg",
      connection: process.env.DB_TEST_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("clean the tables", () => {
    console.log("before cleantables ran");
    cleanTables(db);
  });
  afterEach("clean up", () => {
    console.log("after cleantables ran");
    cleanTables(db);
  });

  describe(`Get /api/users/`, () => {
    context(`Given no users`, () => {
      it(`responds with an empty list`, () => {
        return supertest(app)
          .get(`/api/users/`)
          .expect([]);
      });
    });
    context(`Given users`, () => {
      beforeEach("insert users", () => helpers.seedUsers(db, users));
      it(`responds with expected users`, () => {
        return supertest(app)
          .get(`/api/users/`)
          .expect(expectedUsers);
      });
    });
  });

  describe(`POST /api/users/`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, users));

    const newUserWithId = [
      {
        id: 22,
        username: "MikeObs",
        password: "password",
        name: "Mike"
      }
    ];
    it(`responds with array of users with new user included`, () => {
      return supertest(app)
        .post(`/api/users/`)
        .send(newUser)
        .expect(newUserWithId);
    });
  });

  describe(`GET  /api/:user_name`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, users));
    const user = {
      id: 1,
      username: "dhutch3",
      name: "Danielle",
      password: "password"
    };
    it("Returns user object when real user is entered", () => {
      return supertest(app)
        .get(`/api/users/${user.username}`)
        .expect([user]);
    });
  });

  describe(`PATCH /api/:user_name`, () => {
    beforeEach("insert users", () => helpers.seedUsers(db, users));
    const user = {
      id: 1,
      username: "dhutch3",
      name: "Danielle",
      password: "password"
    };
    const newusername = "newusername";
    const newUserObject = {
      id: 1,
      username: "newusername",
      password: "password",
      nickname: "Danielle"
    };
    it("responds with new username", () => {
      return supertest(app)
        .patch(`/api/users/${user.username}`)
        .send({ newusername: newusername })
        .expect([newUserObject]);
    });
  });

  describe(`GET /api/users/:user_name/lists`, () => {
    console.log(testUser.username);
    beforeEach("insert users and lists", () => {
      return helpers.seedUsers(db, users);
    });
    beforeEach("insert users and lists", () => {
      return helpers.seedLists(db, teams);
    });

    const userLists = [
      {
        id: 1,
        listcode: "password",
        listname: "Danielle's Christmas List",
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
    it("responds with lists for user", () => {
      return supertest(app)
        .get(`/api/users/${testUser.username}/lists`)
        .expect(userLists);
    });
  });

  describe(`POST /api/users/:user_name/lists`, () => {
    beforeEach("insert users and lists", () => {
      return helpers.seedUsers(db, users);
    });
    beforeEach("insert users and lists", () => {
      return helpers.seedTeams(db, lists);
    });

    const body = {
      teamcode: password,
      nickname: newUser.nickname,
      password: newUser.password
    };

    it("responds with users list", () => {
      return supertest(app)
        .post(`/api/users/${newuser.username}/lists`)
        .send(body)
        .expect(teams[0]);
    });
  });
});
