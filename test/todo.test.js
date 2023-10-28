const app = require('../app.js')
const request = require('supertest')
const {sequelize} = require('../models')
const { describe } = require('node:test')
const { title } = require('process')
const exp = require('constants')
const {queryInterface} = sequelize

// CODE SEBELUM TESTING
// 1. BULK INSERT / POPULATE DATA  

beforeAll((done) => {
    queryInterface.bulkInsert("Todos", [
        {
            id: 9999991,
            title: "University",
            week: "Week 1",
            task: "Tugas Rangkum Materi",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 9999992,
            title: "University",
            week: "Week 2",
            task: "C++ Pertemuan 2",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 9999993,
            title: "University",
            week: "Week 3",
            task: "C++ Pertemuan 3",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 9999994,
            title: "University",
            week: "Week 4",
            task: "C++ Pertemuan 4",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 9999995,
            title: "University",
            week: "Week 5",
            task: "C++ Pertemuan 5",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ], {})
    .then(_ => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

// Code yang dijalankan setelah testing selesai
// Hapus semua data yang ada dalam tabel Todos

afterAll((done)=> {
    queryInterface.bulkDelete("Todos", null, {})
        .then(_ => {
            done()
        })
        .catch(err => {
            done(err)
        })
})


// UNIT TESTING / Test Driven Development : Untuk mengetest semua endpoint yang sudah dibuat.

describe("GET /todos", () => {
    
    it("Get List todos", (done) => {
       
        request(app)
            .get("/todos")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {data} = res.body;
                expect(data.length).toBe(5)
                const firstData = data[0]

                expect(firstData.title).toEqual("University")
                expect(firstData.id).toEqual(9999991)
                expect(firstData.week).toEqual("Week 1")
                expect(firstData.task).toEqual("Tugas Rangkum Materi")
                done()
            })
            .catch(err => {
                done(err)
            })

    })
});

describe("/todos/:id", () => {
    
    it("GET Todo Detail", (done)=> {
        
        request(app)
            .get(`/todos/${9999991}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {data} = res.body;
                expect(data.id).toEqual(9999991)
                expect(data.title).toEqual("University")
                expect(data.week).toEqual("Week 1")
                expect(data.task).toEqual("Tugas Rangkum Materi")

                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("Error Not Found", (done) => {
        
        request(app)
            .get(`/todos/${99901}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                const {message} = res.body;

                expect(message).toEqual("Error Not Found")
                

                done()
            })
            .catch(err => {
                done(err)
            })
    })
});

describe("POST /todos", () => {
    
    it("Create todo succesfully", (done) => {

        request(app)
            .post("/todos")
            .send({
                title: "Rakamin",
                week: "Week 1",
                task: "UI UX" 
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((res) => {
                const {message, data} = res.body;

                expect(message).toEqual("Successfully Add a Todo")
                expect(data.title).toEqual("Rakamin")
                expect(data.week).toEqual("Week 1")
                expect(data.task).toEqual("UI UX")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("Validation Error", (done) => {

        request(app)
            .post("/todos")
            .send({
                week: "Week 1",
                task: "UI UX"
            })
            .expect('Content-Type', /json/)
            .expect(400)
            .then((res) => {
                const { name, message } = res.body;

                expect(name).toBe("SequelizeValidationError")
                expect(message).toEqual("notNull Violation: Todo.title cannot be null")
                done()
            })
            .catch(err => {
                done(err)
            })

    })

});

describe("PUT /todos/:id", () => {

    it("Todo Update Succesfully", (done) => {

        request(app) 
            .put(`/todos/${9999991}`)
            .send({
                title: "Rakamin",
                week: "Week 2",
                task: "Learn JS"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {

                const {message, data} = res.body;

                expect(message).toEqual("Todo Update Succesfully") 
                expect(data.title).toEqual("Rakamin")
                expect(data.week).toEqual("Week 2")
                expect(data.task).toEqual("Learn JS")

                done()
            })
            .catch(err => {
                done(err)
            }) 
    })

    it("Error Not Found", (done) => {

        request(app)
            .put(`/todos/${99901}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                const { message } = res.body;

                expect(message).toEqual("Error Not Found")


                done()
            })
            .catch(err => {
                done(err)
            })
    })
});

describe("DELETE /todos/:id", () => {

    it("Todo Deleted Succesfully", (done) => {

        request(app)
            .delete(`/todos/${9999995}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                const {message} = res.body;

                expect(message).toEqual("Todo Deleted Succesfully")
                done()
            })
            .catch(err => {
                done(err)
            })

    })

    it("Error Not Found", (done) => {

        request(app)
            .delete(`/todos/${99901}`)
            .expect('Content-Type', /json/)
            .expect(404)
            .then((res) => {
                const { message } = res.body;

                expect(message).toEqual("Error Not Found")


                done()
            })
            .catch(err => {
                done(err)
            })
    })
});