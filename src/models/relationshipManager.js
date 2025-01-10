import { sequelize, Sequelize } from "../config/db.conf.js";
import defineUserModel from "./user.model.js";
import defineRequestModel from "./request.model.js";
import defineAssetModel from "./asset.model.js";
import defineAllocationModel from "./allocation.model.js";

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = defineUserModel(sequelize, Sequelize);
db.Request = defineRequestModel(sequelize, Sequelize);
db.Asset = defineAssetModel(sequelize, Sequelize);
db.Allocation = defineAllocationModel(sequelize, Sequelize);

// Defining relationships (associations)
db.User.hasMany(db.Allocation); // User can have many Allocations
db.Allocation.belongsTo(db.User); // Allocation belongs to a User

db.Asset.hasMany(db.Allocation); // Asset can have many Allocations
db.Allocation.belongsTo(db.Asset); // Allocation belongs to an Asset

db.User.hasMany(db.Request); // User can have many Requests
db.Request.belongsTo(db.User); // Request belongs to a User

db.Asset.hasMany(db.Request); // Asset can have many Requests
db.Request.belongsTo(db.Asset); // Request belongs to an Asset

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error during database setup:", error);
  }
})();

export default db;
