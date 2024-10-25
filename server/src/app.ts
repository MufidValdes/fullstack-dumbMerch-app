import express, { Express } from 'express';
import Authrouter from '@routes/auth.router';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '@utils/swagger-output.json';
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// =================================================================
// ROUTES
// =================================================================
app.use('/api/auth', Authrouter);

export default app;
