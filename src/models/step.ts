import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class Step extends Model {
  public id!: string;
  public name!: string;
  public status!: 'approved' | 'rejected' | 'pending';
}

Step.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('approved', 'rejected', 'pending'),
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    tableName: 'steps',
    sequelize,
    
    }
);

export default Step;