const defineAssetModel = (sequelize, DataTypes) => {
  const Asset = sequelize.define("Asset", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("AVAILABLE", "ASSIGNED", "UNDER_MAINTENANCE"),
      allowNull: false,
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    warrantyEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return Asset;
};

export default defineAssetModel;
