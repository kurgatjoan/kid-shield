const userSchema = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      details: { type: Sequelize.JSON },
      restricted: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: [] },
    },

    { timestamps: true }
  );

  return User;
};

module.exports = userSchema;
