"use strict";
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "Author",
    {
      name: DataTypes.STRING
    },
    {}
  );
  Author.associate = function(models) {
    // associations can be defined here
    Author.hasMany(models.Book, {
      foreignKey: "authorId",
      as: "books",
      onDelete: "CASCADE"
    });
  };
  return Author;
};
