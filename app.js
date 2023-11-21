// app.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");
const routes = require("./routes/toilets");
const cors = require("cors");

const app = express();
app.use(bodyParser({ limit: "50mb" }));
app.use(cors());
app.use(routes);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Toilet API",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, () => console.log("Server is running on port 3000"));
