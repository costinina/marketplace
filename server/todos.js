const express = require("express")
const todoRoutes = express.Router()
const Chance = require("chance")

const chance = new Chance()

let todos = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  description: chance.sentence({ words: 10 }),
  done: chance.bool()
}))

todoRoutes.get("/", (req, res) => {
  res.send(todos)
})

todoRoutes.post("/", (req, res) => {
  const todo = {
    id: chance.guid(),
    description: req.body.description,
    done: false
  }

  todos.push(todo)

  res.send(todo)
})

todoRoutes.patch("/:todoId", (req, res) => {
  const todoId = req.params.todoId
  const { description, done = false } = req.body

  todos = todos.map(t => (t.id == todoId ? { ...t, description, done } : t))

  res.send(todos.find(t => t.id == todoId))
})

todoRoutes.delete("/:todoId", (req, res) => {
  const todoId = req.params.todoId

  todos = todos.filter(t => t.id != todoId)

  res.json({ todoId })
})

module.exports = todoRoutes
