BEGIN;

-- TRUNCATE 
--   giftlist_lists,
--   giftlist_users,
--   giftlist_items
--   RESTART IDENTITY CASCADE;

  INSERT INTO giftlist_lists (listname, listcode, user_id)
  VALUES
  ("Dee's Christmas List", "password", 1),
  ("Mike's Christmas List", "password", 2),
  ("Ash's Christmas List", "password", 3),
  ("Steph's Christmas List", "password", 4,
  ("Hal's Christmas List", "password", 5),
  ("RJ's Christmas List", "password", 6),
  ("Pat's Christmas List", "password", 7)

  INSERT INTO giftlist_users (username, name, password)
  VALUES
  ("Dee","Danielle","password"),
  ("Mike","Michael","password"),
  ("Ash","Ashley","password"),
  ("Steph","Stephanie","password"),
  ("Hal","Haley","password"),
  ("RJ","Ryan","password"),
  ("Pat","Patrick","password")

  INSERT INTO giftlist_items (name, listid)
  VALUES
  ("Apple TV", 1),
  ("iPad", 1),
  ("Perfume", 1),
  ("Slippers", 1),
  ("Yeti Mug", 1),
  ("iPad", 2),
  ("Xbox games", 2),
  ("Portable phone charger", 2),
  ("Leather wallet", 2),
  ("Slippers", 2),
  ("Slippers", 3),
  ("iPhone case", 3),
  ("Fleece Pajamas", 3),
  ("Nespresso Coffee Maker", 3),
  ("Winter Boots", 3),
  ("iPad", 4),
  ("Heated Blanket",4),
  ("Running Shoes", 4),
  ("Air Fryer", 4),
  ("Headphones", 4),
  ("Gold necklace", 5),
  ("Sweater", 5),
  ("Purse", 5),
  ("Perfume", 5),
  ("Yeti Mug", 5),
  ("iPhone", 6),
  ("Leather wallet", 6),
  ("Slippers", 6),
  ("Winter Coat", 6),
  ("Nintendo Switch", 6),
  ("Luggage", 7),
  ("Cologne", 7),
  ("Slippers",7),
  ("Yeti Mug", 7),
  ("Automatic Car Starter", 7)

  COMMIT;