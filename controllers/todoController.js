const {Todo} = require('../models')

class TodoController {
    static findAll = async (req, res, next) => {
        try {
            const todos = await Todo.findAll();

            res.status(200).json({data: todos})
        } catch (err) {
            next(err)
        }
    }

    static findOne = async (req, res, next) => {
        try {
            const {id} = req.params;
            const todo = await Todo.findOne({
                where: {
                    id
                }
            })

            if(!todo) {
                throw ({name: "ErrorNotFound"})
            } 

            res.status(200).json({data: todo})
            
        } catch (err) {
            console.log("Masook");
            next(err)
        }
    }

    static create = async (req, res, next) => {
        try {
            const {title, week, task} = req.body;

            const createTodo = await Todo.create({
                title,
                week, 
                task
            }, {returning: true})

            res.status(201).json({
                message: "Successfully Add a Todo",
                data: createTodo
            })

        } catch (err) {
            next(err)
        }
    }

    static update = async (req, res, next) => {
        try {
            const {title, week, task} = req.body;
            const {id} = req.params;

            const foundTodo = await Todo.findOne({
                where: {
                    id
                }
            })

            if(!foundTodo) {
                throw ({name : "ErrorNotFound"})
            }

            await foundTodo.update ({
                title: title || foundTodo.title,
                week: title || foundTodo.week,
                task: task || foundTodo.task
            })

            res.status(200).json({
                message: "Todo Update Succesfully",
                date: foundTodo
            })
        } catch (err) {
            next(err)
        }
    }

    static destroy = async (req, res, next) => {
        try {
            const {id} = req.params

            const foundTodo = await Todo.findOne({
                where: {
                    id
                }
            })
            if(!foundTodo) {
                throw ({name: "ErrorNotFound"})
            }

            await foundTodo.destroy();
            res.status(200).json({
                message: "Todo Deleted Succesfully"
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TodoController;