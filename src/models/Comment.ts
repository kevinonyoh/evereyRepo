import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import User from './User';
import Article from './Article';

class Comment extends Model {
    public commentId!: string;
    public userId!: string;
    public articleId!: string;
    public comment!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Comment.init(
    {
        commentId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
             model: User,
                key: 'id',
            },
        },
        articleId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Article,
                key: 'id',
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'comments',
        sequelize,

        }
    
);

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Article, { foreignKey: 'articleId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Article.hasMany(Comment, { foreignKey: 'articleId' });

export default Comment;