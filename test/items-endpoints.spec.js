const ItemsService = require("../src/items/items-service");
const knex = require("knex");
const app = require('../src/app')

describe(`Items service object`, function() {
  let db

  let testItems = [
      {
        id: 1,
        item_name: 'Apple TV',
        graphic: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwii-_qx05DnAhVDeawKHdJhBiUQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.apple.com%2Fshop%2Fbuy-tv%2Fapple-tv-hd%2F32gb&psig=AOvVaw2CpYEjEK0jOE__VrWxw_b1&ust=1579557226153888',
        link: 'https://www.bestbuy.com/site/apple-apple-tv-32gb-latest-model-black/5901531.p?skuId=5901531&ref=212&loc=1&extStoreId=1027&ref=212&loc=1&ds_rl=1266837&gclid=Cj0KCQiAmZDxBRDIARIsABnkbYRZFD-Th7TXcie5r7qZDnaZSNA8AbboUNCIMbsWvSNqaK6Hce50q_EaAqdbEALw_wcB&gclsrc=aw.ds',
      },
      {
        id: 2,
        item_name: 'Weighted Blanket',
        graphic: 'https://target.scene7.com/is/image/Target/GUEST_08b99aaa-215d-4c42-ae16-716037677b0f?fmt=webp&wid=1400&qlt=808',
        link: 'https://www.target.com/p/12lbs-weighted-throw-blanket-gray-tranquility/-/A-53691535?ref=tgt_adv_XS000000&AFID=google_pla_df&fndsrc=tgtao&CPNG=PLA_Bedding%2BShopping_Local&adgroup=SC_Bedding_Local&LID=700000001170770pgs&network=g&device=c&location=9027248&ds_rl=1246978&ds_rl=1247068&ds_rl=1246978&gclid=Cj0KCQiAmZDxBRDIARIsABnkbYQZysztlpE6WGPTDQcDCd2pODBZUxEn8ECuyKGYXB3sp1mw8nt11mIaAsd9EALw_wcB&gclsrc=aw.ds',
      },
      {
        id: 3,
        item_name: 'Apple iPad',
        graphic: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5985/5985609_sd.jpg;maxHeight=1000;maxWidth=1000',
        link: 'https://www.bestbuy.com/site/apple-ipad-latest-model-with-wi-fi-32gb-space-gray/5985609.p?skuId=5985609&ref=212&loc=1&extStoreId=1027&ref=212&loc=1&ds_rl=1262659&gclid=Cj0KCQiAmZDxBRDIARIsABnkbYS0DE0x_O2FMzdcpA5EmXOKlOz3BaVmGHC8pobL_9eo0l4AB6McJu4aAlWJEALw_wcB&gclsrc=aw.ds',
      },
  ];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  before('cleanup', () => {
    // empty the giftlist_items table
    return db.raw(
      `TRUNCATE
        giftlist_users,
        giftlist_items,
        giftlist_list
        CASCADE
      `
    )
    .then(() => {
      console.log('before adding')
      // insert our test user list into giftlist_users table
      return db.into("giftlist_items").insert(testItems)
    })
    .then(() => {
      console.log("after adding")
    })
  })

  after(() => db.destroy());

  describe(`getAllItems()`, () => {
    it(`resolves all items from 'giftlist_items' table`, () => {
      return ItemsService.getAllItems(db).then(actual => {
        expect(actual).to.eql(testItems);
      });
    });
  });
});