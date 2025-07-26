import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { authRouter } from './app/modules/auth/auth.routes';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello From OAuth2 Server');
});

export default app;
