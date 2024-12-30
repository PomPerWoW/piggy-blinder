import express, { Express } from 'express';
import config from '@piggy-server/config';

const PORT = config.SERVER_PORT;

const app: Express = express();

app.listen(PORT, () => {
  console.log(`Piggy server running on port ${PORT}`);
});
