'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Customer, 
                     {foreignKey: { name: 'id_customer' }, 
                      onDelete: 'SET NULL', 
                      onUpdate: 'CASCADE',
                      hooks: true,
                     }
      );
    }

    static buatPesanan() {
      
    }

  };
  Pesanan.init({
    id_customer: DataTypes.INTEGER,
    items: DataTypes.JSONB,
    metode_pembayaran: DataTypes.STRING,
    status_pembayaran: DataTypes.STRING,
    status_pesanan: DataTypes.STRING,
    catatan: DataTypes.TEXT,
    total_harga: DataTypes.DECIMAL,
    invoice_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pesanan',
  });
  return Pesanan;
};