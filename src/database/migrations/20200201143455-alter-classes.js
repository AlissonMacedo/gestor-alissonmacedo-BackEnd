module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'classes', // name of Source model
      'course_id', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'courses', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'classes', // name of Source model
      'course_id' // key we want to remove
    );
  },
};
