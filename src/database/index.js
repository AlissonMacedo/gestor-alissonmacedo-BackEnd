import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import Empresa from '../app/models/Empresa';
import Class from '../app/models/Class';
import Student from '../app/models/Student';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [User, Empresa, Class, Student, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
