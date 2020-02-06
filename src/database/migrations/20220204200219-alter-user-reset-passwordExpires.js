module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', // name of Source model
      'password_reset_expires', // name of the key we're adding
      {
        type: Sequelize.DATE,
        allowNull: true,
      }
    );
  },

  down: queryInterface => {
    return queryInterface.removeColumn(
      'users', // name of Source model
      'password_reset_expires' // key we want to remove
    );
  },
};
