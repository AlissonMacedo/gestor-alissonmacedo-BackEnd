module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // name of Source model
      'password_reset_token', // name of the key we're adding
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn(
      'users', // name of Source model
      'password_reset_token' // key we want to remove
    );
  },
};
