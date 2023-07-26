import { config } from 'dotenv';

config();

const configs = {
  server: {
    PORT: process.env.PORT,
  },
  postgres: {
    HOST: process.env.PGHOST,
    USER: process.env.PGUSER,
    DATABASE: process.env.PGDATABASE,
    PASSWORD: process.env.PGPASSWORD,
    PORT: process.env.PGPORT,
  },
  jwt: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES,
  },
  hash: {
    SALT_ROUNDS: process.env.SALT_ROUNDS,
  },
};

export default configs;
