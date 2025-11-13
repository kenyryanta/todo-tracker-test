'use client';
import { useState, useEffect } from 'react';
import * as api from './services/api';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch todos saat load
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await api.getTodos();
        setTodos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTodos();
  }, []);

  // 2. Handler untuk Add Todo
  const handleAddTodo = async (title, description) => {
    try {
      const newTodo = await api.createTodo(title, description);
      setTodos([...todos, newTodo]);
    } catch (err) {
      alert(`Failed to add todo: ${err.message}`); // Tampilkan error
      throw err; // Lempar ulang agar form tahu
    }
  };

  // 3. Handler untuk Toggle Complete
  const handleToggleComplete = async (id, currentCompleted) => {
    try {
      const updatedTodo = await api.updateTodo(id, { completed: !currentCompleted });
      setTodos(
        todos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      alert(`Failed to update todo: ${err.message}`);
    }
  };

  // 4. Handler untuk Delete Todo
  const handleDeleteTodo = async (id) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      await api.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      alert(`Failed to delete todo: ${err.message}`);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4 sm:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400">Todo Tracker</h1>
      </header>
      
      <AddTodoForm onAddTodo={handleAddTodo} />

      <section>
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">My List</h2>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-400">Error: {error}</p>}
        {!loading && !error && (
          <TodoList
            todos={todos}
            onToggleComplete={handleToggleComplete}
            onDeleteTodo={handleDeleteTodo}
          />
        )}
      </section>
    </main>
  );
}