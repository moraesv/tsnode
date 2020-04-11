import { Sequelize, Dialect } from 'sequelize'

import databaseConfig from '../config/database'

const models = []

class Database {
  private connection: Sequelize
  constructor() {
    this.init()
  }

  public init(): void {
    this.connection = new Sequelize(
      databaseConfig.database,
      databaseConfig.username,
      databaseConfig.password,
      {
        ...databaseConfig,
        dialect: databaseConfig.dialect as Dialect,
      }
    )

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
}

export default new Database()
