import db from '../models/index.cjs';
const { Todo } = db;                 // <-- DEKLARASI 2 (Ini penyebab error)

// Helper function untuk 404
const findTodoOrThrow = async (id, res) => {
  const todo = await Todo.findByPk(id);
  if (!todo) {
    throw new Error('TodoNotFound'); // Custom error
  }
  return todo;
};

// @desc    Get all todos
// @route   GET /todos
export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.findAll({ order: [['createdAt', 'ASC']] });
    res.json(todos);
  } catch (error) {
    next(error); // Kirim ke error handler
  }
};

// @desc    Create new todo
// @route   POST /todos
export const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    // Validasi sudah ditangani oleh Sequelize, tapi Anda bisa tambahkan lagi
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const newTodo = await Todo.create({ title, description });
    res.status(201).json(newTodo);
  } catch (error) {
    next(error); // Kirim ke error handler
  }
};

// @desc    Update a todo
// @route   PUT /todos/:id
export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const todo = await findTodoOrThrow(id, res);
    
    // Update field, gunakan '??' (Nullish coalescing) untuk memperbolehkan update 'false'
    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.completed = completed ?? todo.completed;
    
    await todo.save();
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a todo
// @route   DELETE /todos/:id
export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await findTodoOrThrow(id, res);
    
    await todo.destroy();
    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};