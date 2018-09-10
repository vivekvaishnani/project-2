module.exports = function (sequelize, DataTypes) {
    var UserInfo = sequelize.define("UserInfo", {
        date: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        phoneNumber: DataTypes.INTEGER,
        totalPrice: DataTypes.INTEGER,
    });
    return UserInfo;
};