import Sequelize, { Model } from 'sequelize';

class Classe extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Empresa, { foreignKey: 'empresa_id', as: 'empresa' });
    this.belongsTo(models.Course, { foreignKey: 'course_id', as: 'course' });
  }
}

export default Classe;
