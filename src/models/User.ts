import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';
import { AcademicRole, Gender } from '../interfaces/model.interface';
import Institution from './institution';

class User extends Model {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public phoneNumber!: string;
    public profileUrl!: string;
    public gender!: string;
    public organisation!: string;
    public department!: string;
    public level!: string;
    public cv!: string;
    public language!: string;
    public purposeOfResearch!: string;
    public academicRole!: string;
    public linkedinUrl!: string;
    public researchGateUrl!: string;
    public isreseacher!: boolean;
    public isSubscribe!: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        firstName: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },

        lastName: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },

       phoneNumber: {
        type: new DataTypes.STRING(128),
        allowNull: true
       },

       email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique   : true
       },

       profileUrl: {
        type: new DataTypes.STRING(128),
        allowNull: true
       },

       password: {
        type: new DataTypes.STRING(128),
        allowNull: true
       },
        
       gender: {
        type: new DataTypes.ENUM(Gender.MALE, Gender.FEMALE),
        allowNull: true
       },

       organisation: {
        type: new DataTypes.STRING(128),
        allowNull: true
       },
       
       department: {
        type: new DataTypes.STRING(128),
        allowNull: true
       },

       level: {
        type: new DataTypes.STRING(128),
        allowNull: true
       },

       cv: {
        type: new DataTypes.STRING(128),
        allowNull: true
       },

       language: {
        type: new DataTypes.STRING(128),
        allowNull: true
       },

       purposeOfResearch: {
        type: new DataTypes.STRING(128),
        allowNull: true
       },

       academicRole: {
        type: new DataTypes.ENUM(AcademicRole.LECTURER, AcademicRole.RESEARCHER, AcademicRole.STUDENT),
        allowNull: false
       },

       linkedinUrl: {
        type: new DataTypes.STRING(128),
        allowNull: true
       },

       researchGateUrl: {
        type: new DataTypes.STRING,
        allowNull: true
       },

       isReseacher: {
         type: new DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: false
       },
       
       isSubscribe: {
        type: new DataTypes.BOOLEAN,
        defaultValue: false
       },

       isEmailVerified: {
         type: new DataTypes.BOOLEAN,
         defaultValue: false
       },

       institutionId: {
        type: DataTypes.UUID,
        allowNull: true, 
        references: {
          model: Institution,  
          key: 'id'
        }
      },

    },
    {
        tableName: 'users',
        underscored: true,
        sequelize,
    
    }
);

User.prototype.toJSON = function () {
    const userObj = this.get();
    delete userObj.password;
    return userObj;
};

export default User;






















