const defineRequestModel = (sequelize, DataTypes) => {
  const Request = sequelize.define("Request", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
      allowNull: false,
      defaultValue: "PENDING",
    },
  });

  return Request;
};

export default defineRequestModel;
