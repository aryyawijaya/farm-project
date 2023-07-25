import { config } from 'dotenv';

config();

const configs = {
  server: {
    PORT: process.env.PORT,
  },
};

export default configs;
