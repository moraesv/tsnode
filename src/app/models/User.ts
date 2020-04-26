import bcrypt from 'bcryptjs'

import { Model, DataTypes } from 'sequelize'

export default class User extends Model {
  public name: string
  public email: string
  public password: string
  public passwordHash: string

  public static init(sequelize): User {
    return super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        passwordHash: DataTypes.STRING,
      },
      {
        sequelize,
        hooks: {
          beforeSave: async (user) => {
            if (user.password) {
              user.passwordHash = await bcrypt.hash(user.password, 8)
            }
          },
        },
      }
    )
  }

  public static associate(models): void {}

  checkPassword(password: string): boolean {
    return bcrypt.compare(password, this.passwordHash)
  }
}
