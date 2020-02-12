"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Books",
      [
        {
          id: 1,
          title: "GraphQL for Grabbers",
          content: "Lorem ipsum",
          authorId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          title: "Apollo for Grabbers",
          content: "Lorem ipsum",
          authorId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          title: "Prisma GraphQL",
          content: "Lorem ipsum",
          authorId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 4,
          title: "NestJS GraphQL",
          content: "Lorem ipsum",
          authorId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Books", null, {})
};
