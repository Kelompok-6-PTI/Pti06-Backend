'use strict';
const {
  Model
} = require('sequelize');

/* import bcrypt untuk melakukan enkripsi */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Pesanan,{ foreignKey: { name: 'id_customer' }, 
                       onDelete: 'SET NULL', 
                       onUpdate: 'CASCADE',
                       hooks: true,
                     }
      );
    }

    // Method untuk melakukan enkripsi
    static async encrypt(password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword
    }

    /* Method register Customer */
    static async register({ namaCustomer, noTelepon, password }) {
      const encryptedPassword = await this.encrypt(password);
      /*
        encrypt dari static method
        encryptedPassword akan sama dengan string hasil enkripsi password dari method encrypt
      */
      return this.create({ nama_customer: namaCustomer, no_telepon: noTelepon, password: encryptedPassword });
    }

    /* Method update, untuk update Customer */
    static async updateCustomer({ namaCustomer, noTelepon, alamat, password },id) {
      if (password != "") {
        const encryptedPassword = await this.encrypt(password);
        return this.update({ nama_customer: namaCustomer, no_telepon: noTelepon, alamat: alamat, password: encryptedPassword }, { where:{id: id} });
      }
      else{
        return this.update({ nama_customer: namaCustomer, no_telepon: noTelepon, alamat: alamat }, { where:{id: id} });
      }
      
    } 

  };
  Customer.init({
    nama_customer: DataTypes.STRING,
    no_telepon: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};