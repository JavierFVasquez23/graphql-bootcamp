"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Authors",
      [
        {
          id: 1,
          name: "Javier",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          name: "Lucho",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: "Alejandro",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Authors", null, {})
};
