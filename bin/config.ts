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
};

export default configs;
