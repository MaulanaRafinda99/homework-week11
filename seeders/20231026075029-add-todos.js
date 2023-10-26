'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Todos", [
      {
        title: "University",
        week: "Week 1",
        task: "Tugas Rangkum Materi",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "University",
        week: "Week 2",
        task: "C++ Pertemuan 2",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "University",
        week: "Week 3",
        task: "C++ Pertemuan 3",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "University",
        week: "Week 4",
        task: "C++ Pertemuan 4",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "University",
        week: "Week 5",
        task: "C++ Pertemuan 5",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
