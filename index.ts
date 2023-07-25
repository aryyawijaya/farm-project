import express from 'express';
import { createServer } from 'http';
import configs from './bin/config';

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

server.listen(PORT, () => {
  console.info(`Server listening at port: ${PORT}`);
});
