const defineRequestModel = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    "Request",
    {
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
        type: DataTypes.ENUM("REQUEST_ASSET", "RETURN_ASSET"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      assetId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "asset",
          key: "id",
        },
      },
    },
    {
      tableName: "request",
    }
  );

  return Request;
};

export default defineRequestModel;
