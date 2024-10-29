import express, { Express } from 'express';
import Authrouter from '@routes/auth.router';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '@utils/swagger-output.json';
import cors from 'cors';
import CategoryRouter from './routes/category.router';
import OrderRouter from './routes/order.router';
import ReviewRouter from './routes/review.router';
import ProfileRouter from './routes/profile.router';
import ProductRouter from './routes/product.router';
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// =================================================================
// ROUTES
// =================================================================
app.use('/api/auth', Authrouter);
app.use('/api/categories', CategoryRouter);
app.use('/api/product', ProductRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/reviews', ReviewRouter);
app.use('/api/profile', ProfileRouter);

export default app;
