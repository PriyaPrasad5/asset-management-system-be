const defineAllocationModel = (sequelize, DataTypes) => {
  const Allocation = sequelize.define("Allocation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  return Allocation;
};

export default defineAllocationModel;
