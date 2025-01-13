const defineAllocationModel = (sequelize, DataTypes) => {
  const Allocation = sequelize.define(
    "Allocation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.ENUM("ALLOCATION", "RETURN"),
        allowNull: false,
      },
      assetId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "asset",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id",
        },
      },
      createdOn: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "allocation",
    }
  );

  return Allocation;
};

export default defineAllocationModel;
