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
      fullname: 'Antonio Gaming',
      // username: 'antonio',
      email: 'antonio@example.com',
      password: 'Password123',
    },
    Login: {
      email: 'antonio@example.com',
      password: 'Password123',
    },

    ProfileUpdate: {
      fullname: 'antonio Gaming',
      phone: '+123 456789',
      address: 'Bintaro',
      gender: 'MALE',
      avatar: 'https://wallpapercave.com/wp/wp13357495.jpg',
    },
    Category: {
      category_name: 'Electronics',
    },
    Product: {
      product_name: 'Smartphone',
      // product_image: 'https://thumb.viva.id/vivagadget/665x374/2023/11/14/655287073b173-xiaomi-14-pro_gadget.jpg',
      description: 'A high-end smartphone with 128GB storage',
      prince: 522.99,
      stock: 50,
      categoryId: 1,
    },
    Order: {
      userId: 1,
      orderItems: [
        {
          productId: 1,
          quantity: 2,
          price: 522.99,
        },
      ],
    },
    totalAmount: 1399.98,
  },
};

const outputFile = './swagger-output.json'; // Output file Swagger
const endpointsFiles = ['./src/app.ts']; // File entrypoint untuk routing Express

swaggerAutogen()(outputFile, endpointsFiles, doc);
