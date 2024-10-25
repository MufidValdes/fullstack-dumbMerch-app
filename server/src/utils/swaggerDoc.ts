import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'E-commerce API',
    description: 'API documentation for the e-commerce application',
  },
  host: 'localhost:3000', // Sesuaikan dengan port aplikasi
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  definitions: {
    Register: {
      fullname: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
      password: 'Password123',
    },
    Login: {
      email: 'johndoe@example.com',
      password: 'Password123',
    },
  },
};

const outputFile = './swagger-output.json'; // Output file Swagger
const endpointsFiles = ['./src/app.ts']; // File entrypoint untuk routing Express

swaggerAutogen()(outputFile, endpointsFiles, doc);
