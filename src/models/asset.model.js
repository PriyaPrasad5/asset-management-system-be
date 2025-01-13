const defineAssetModel = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "Asset",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      assetId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //laptop,pc,phone
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false, //windows,ios
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
        allowNull: false,
      },
      nextServiceDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
      },
    },
    {
      tableName: "asset",
    }
  );

  return Asset;
};

export default defineAssetModel;
