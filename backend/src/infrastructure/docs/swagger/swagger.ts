import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Piggy Blinder APIs',
      version: '1.0.0',
      description: 'Piggy Blinder API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/interfaces/routes/*.ts'],
};

export const specs = swaggerJsdoc(options);
