BEGIN;

TRUNCATE 
  giftlist_users,
  giftlist_lists,

  RESTART IDENTITY CASCADE;

  INSERT INTO giftlist_users (username, name, password)
  VALUES
  ("Dee","Danielle","password"),
  ("Mike","Michael","password"),
  ("Ash","Ashley","password"),
  ("Steph","Stephanie","password"),
  ("Hal","Haley","password"),
  ("RJ","Ryan","password"),
  ("Pat","Patrick","password"),

  INSERT INTO giftlist_lists (username, listname, items)
  VALUES
  ("Dee", "Dee's Christmas List", "password"),
  ("Mike", "Mike's Christmas List","password"),
  ("Ash","Ash's Christmas List","password"),
  ("Steph","Steph's Christmas List","password"),
  ("Hal","Hal's Christmas List","password"),
  ("RJ","RJ's Christmas List","password"),
  ("Pat","Pat's Christmas List","password"),


COMMIT;