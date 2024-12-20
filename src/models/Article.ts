import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import User from './User';

class Article extends Model {
    public id!: string;
    public title!: string;
    public content!: string;
    public userId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Article.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        content: {
            type: new DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        tableName: 'articles',
        sequelize,
    
        }
    
    
);

Article.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Article, { foreignKey: 'userId' });

export default Article;