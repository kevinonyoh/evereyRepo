import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { Permission } from "../interfaces/model.interface";


class Admin extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public permission!: string;
    public status!: boolean;
}


Admin.init({
    
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },

    name: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },

    permission: {
        type: new DataTypes.ENUM(Permission.OPERATIONAL, Permission.SUPERADMIN),
        allowNull: false
    },

    password: {
        type: new DataTypes.STRING(128),
        allowNull: true
    },

    status: {
      type: new DataTypes.BOOLEAN,
      defaultValue: false
    }
},
    {
        tableName: 'admins',
        underscored: true,
        sequelize,
    
    }
);
    

Admin.prototype.toJSON = function () {
    const userObj = this.get();
    return userObj;
};



export default Admin;