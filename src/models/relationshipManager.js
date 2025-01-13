import { sequelize, Sequelize } from "../config/db.conf.js";
import defineAllocationModel from "./allocation.model.js";
import defineAssetModel from "./asset.model.js";
import defineRequestModel from "./request.model.js";
import defineUserModel from "./user.model.js";

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = defineUserModel(sequelize, Sequelize);
db.Request = defineRequestModel(sequelize, Sequelize);
db.Asset = defineAssetModel(sequelize, Sequelize);
db.Allocation = defineAllocationModel(sequelize, Sequelize);

// Defining relationships (associations)
db.User.hasMany(db.Allocation, { foreignKey: "userId", onDelete: "CASCADE" });
db.Allocation.belongsTo(db.User, { foreignKey: "userId", onDelete: "CASCADE" });

db.User.hasMany(db.Asset, { foreignKey: "userId", onDelete: "CASCADE" });
db.Asset.belongsTo(db.User, { foreignKey: "userId", onDelete: "CASCADE" });

db.Asset.hasMany(db.Allocation, { foreignKey: "assetId", onDelete: "CASCADE" });
db.Allocation.belongsTo(db.Asset, {
  foreignKey: "assetId",
  onDelete: "CASCADE",
});

db.User.hasMany(db.Request, { foreignKey: "userId", onDelete: "CASCADE" });
db.Request.belongsTo(db.User, { foreignKey: "userId", onDelete: "CASCADE" });

db.Asset.hasMany(db.Request, { foreignKey: "assetId", onDelete: "CASCADE" });
db.Request.belongsTo(db.Asset, { foreignKey: "assetId", onDelete: "CASCADE" });

(async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully");
  } catch (error) {
    console.error("Error during database setup:", error);
  }
})();

export default db;
