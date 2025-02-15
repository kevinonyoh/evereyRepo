import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import User from "./User";
import Article from "./Article";

class Comment extends Model {
  public id!: string;
  public userId!: string;
  public articleId!: string;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    articleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Article,
        key: "id",
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500],
      },
    },
  },
  {
    tableName: "comments",
    underscored: true,
    sequelize,
  }
);

// Relationships
Comment.belongsTo(User, { foreignKey: "userId", as: "user" });
Comment.belongsTo(Article, { foreignKey: "articleId", as: "article" });
User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Article.hasMany(Comment, { foreignKey: "articleId", as: "comments" });

export default Comment;
