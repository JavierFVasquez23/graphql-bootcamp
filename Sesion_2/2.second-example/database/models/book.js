"use strict";
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      authorId: DataTypes.INTEGER
    },
    {}
  );
  Book.associate = function(models) {
    // associations can be defined here
    Book.belongsTo(models.Author, {
      foreignKey: "authorId",
      as: "author",
      onDelete: "CASCADE"
    });
  };
  return Book;
};
