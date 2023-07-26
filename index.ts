import express from 'express';
import { createServer } from 'http';
import configs from './bin/config';
import { pgInit } from './bin/databases/postgresql/connection';

const { PORT } = configs.server;

const app = express();

app.use((req: express.Request, res: express.Response) => {
  res.status(404).send({
    ok: false,
    status: 404,
    message: 'Enpoint not found',
    data: {},
  });
});

const server = createServer(app);

const startServer = async () => {
  const scope = 'startServer';
  try {
    await pgInit();
    server.listen(PORT, () => {
      console.info(`INFO: Server listening at port: ${PORT}`);
    });
  } catch (error) {
    console.error(
      `ERROR: Cannot start server; REASON: ${error}; SCOPE: ${scope}`,
    );
  }
};

startServer();
