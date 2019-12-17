const knex = require("knex");
const app = require("../src/app");
const { cleanTables } = require("./helpers");
const { seedData } = require("./seedData");
require("dotenv").config();

describe.only("Users Endpoints", function() {
  let db;
  const users = seedData.users();
  const lists = seedData.teams();
  before("make knex instance", () => {
    console.log(process.env.TEST_DB_URL);
    db = knex({
      client: "pg",
      connection: process.env.DB_TEST_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("clean the tables", () => cleanTables(db));
  afterEach("clean up", () => cleanTables(db));

  describe.skip(`Get /api/lists/`, () => {
    context(`Given no username`, () => {
      it(`responds with an empty list`, () => {
        return supertest(app)
          .get(`/api/lists/`)
          .expect([]);
      });
    });
  });
});