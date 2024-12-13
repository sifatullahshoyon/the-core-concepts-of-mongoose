import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlwares/globalErrorHandler';
import notFound from './app/middlwares/notFound';
import router from './app/routes';
const app: Application = express();

// use parsers:
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  // Promise.reject();
  const a = 10;
  res.send(a);
};

app.get('/', test);
app.get('/', (req: Request, res: Response) => {
  res.send('Start PH University Management Service Server!');
});

app.use(globalErrorHandler);
// not found
app.use(notFound);

export default app;
