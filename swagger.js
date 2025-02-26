const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description:
        "Authentication API with JWT for user login, register, and more.",
    },
    servers: [
      {
        // url: "http://localhost:4000/api",
        url: "http://185.217.131.227:4000/api",
      },
    ],
  },
  apis: ["./router/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerSpec, swaggerUi };
