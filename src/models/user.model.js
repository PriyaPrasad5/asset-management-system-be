const defineUserModel = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "user",
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true, 
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM("ADMIN", "MANAGER", "EMPLOYEE"),
          allowNull: false,
        },
        updated_on: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        created_on: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "user",
        timestamps: false,
      }
    );
  
    return User;
  };
  
  export default defineUserModel;
  
