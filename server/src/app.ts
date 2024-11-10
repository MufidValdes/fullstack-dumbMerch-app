import Authrouter from '@routes/auth.router';
import swaggerFile from '@utils/swagger-output.json';
import cors from 'cors';
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import CartRouter from './routes/cart.router';
import CategoryRouter from './routes/category.router';
import ChatRouter from './routes/chat.router';
import OrderRouter from './routes/order.router';
import ProductRouter from './routes/product.router';
import ProfileRouter from './routes/profile.router';
import ReviewRouter from './routes/review.router';
import PaymentRouter from './routes/payment.router';
import usersRouter from './routes/user.router';
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
app.use('/api/cart', CartRouter);
app.use('/api/product', ProductRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/reviews', ReviewRouter);
app.use('/api/profile', ProfileRouter);
app.use('/api/chat', ChatRouter);
app.use('/api/payment', PaymentRouter);
app.use('/api/users', usersRouter);
export default app;
