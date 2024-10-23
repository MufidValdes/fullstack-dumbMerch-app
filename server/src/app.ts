import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =================================================================
// ROUTES
// =================================================================
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
export default app;
