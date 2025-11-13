import express from 'express';
import {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController.js';

const router = express.Router();

router.route('/')
  .get(getAllTodos)   // GET /todos
  .post(createTodo);  // POST /todos

router.route('/:id')
  .put(updateTodo)    // PUT /todos/:id
  .delete(deleteTodo); // DELETE /todos/:id

export default router;