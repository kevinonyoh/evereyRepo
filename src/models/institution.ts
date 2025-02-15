import { DataTypes, Model } from "sequelize";
import sequelize from '../db';

class Institution extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public state!: string;
    public password!: string;
    public subscriptionStatus!: boolean;
    public iconUrl!: string; 
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Institution.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
 
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true   
        },

        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },

        subscriptionStatus: {
            type: new DataTypes.BOOLEAN,
            defaultValue: false
        },

        iconUrl: {
            type: new DataTypes.STRING(128),
            allowNull: true
        },

        password: {
            type: new DataTypes.STRING(128),
            allowNull: false
        }
       
    },
    {
        tableName: 'institutions',
        underscored: true,
        sequelize,
    
    }
);

Institution.prototype.toJSON = function () {
    const userObj = this.get();
    delete userObj.password;
    return userObj;
};

export default Institution;