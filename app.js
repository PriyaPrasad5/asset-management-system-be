import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
// import employeeRoutes from "./src/routes/employee.routes";
// import managerRoutes from "./src/routes/manager.routes";
// import relationModel from "./src/models/relationshipManager.js";
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api", employeeRoutes);
// app.use("/api", managerRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Now listening on port ${process.env.PORT || 4000}`);
});
