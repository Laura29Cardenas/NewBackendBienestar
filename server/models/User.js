import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', { 
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
  },
}, {
  timestamps: true,
});

export default User;

