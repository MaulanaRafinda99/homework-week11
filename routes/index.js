const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController.js')

router.get("/todos", TodoController.findAll)
router.get("/todos/:id", TodoController.findOne)
router.post("/todos", TodoController.create)
router.put("/todos/:id", TodoController.update)
router.delete("/todos/:id", TodoController.destroy)


module.exports = router;