import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import swaggerUi from "swagger-ui-express";
import adminRoutes from "./src/routes/admin.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import employeeRoutes from "./src/routes/employee.routes.js";
import managerRoutes from "./src/routes/manager.routes.js";
import swaggerDocument from "./src/swagger-docs/spec.json" assert { type: "json" };
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/manager", managerRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Now listening on port ${process.env.PORT || 4000}`);
});
