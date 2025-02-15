import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import User from "./User";
import { publicationType, researchCategory, statusPublish } from "../interfaces/model.interface";

class Article extends Model {
  public id!: string;
  public title!: string;
  public abstract!: string;
  public author!: string;
  public userId!: string;
  public doiNumber!: string;
  public publicationName!: string;
  public filePath?: string;
  public fileType?: string;
  public cloudinaryPublicId?: string;
  public status!: string;
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
      type: DataTypes.STRING,
      allowNull: false
    },

    abstract: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    publicationName: {
      type: DataTypes.STRING,
      allowNull: false
    },

    doiNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },

    author: {
      type: DataTypes.STRING,
      allowNull: false
    },

    category: {
      type: DataTypes.ENUM(researchCategory.BUSINESS, researchCategory.ENGINEERING, researchCategory.ENVIRONMENTAL, researchCategory.MEDICAL, researchCategory.SCIENCE, researchCategory.SOCIAL),
      allowNull: false
    },

    subCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },

    publicationType: {
      
      type: DataTypes.ENUM(
        publicationType.BOOK_CHAPTER,
        publicationType.CASE_STUDIES,
        publicationType.CONFERENCE_PAPER,
        publicationType.DISSERATATIONS,
        publicationType.LITERATURE_REVIEW,
        publicationType.POLICY_BRIEFS,
        publicationType.RESEARCH_PAPER,
        publicationType.TECHNICAL_REPORTS,
        publicationType.THESIS,
        publicationType.WHITE_PAPER
        ),
      
      allowNull: false

    },

    publicationDate: {

      type: DataTypes.DATE,
    
      allowNull: true, 
    },


    status: {
      type: DataTypes.ENUM(statusPublish.DRAFT, statusPublish.PUBLISHED, statusPublish.REJECTED, statusPublish.UNDER_REVIEW),
      defaultValue: statusPublish.DRAFT
    },

    filePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    fileType: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    cloudinaryPublicId: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    userId: {
      type: DataTypes.UUID, 
      allowNull: false,
      references: {
        model: User,  
        key: 'id'
      }
    },

  },
  {
    tableName: "articles",
    underscored: true,
    sequelize,
  }
);

// Relationships
Article.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Article, { foreignKey: "userId", as: "articles" });

export default Article;
