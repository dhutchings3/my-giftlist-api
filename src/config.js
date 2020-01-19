module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@postgres/my-giftlist',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://postgres@postgres/my-giftlist-test',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://localhost:300',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
}