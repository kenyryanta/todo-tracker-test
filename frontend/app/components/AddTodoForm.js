'use client';
import { useState } from 'react';

export default function AddTodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title) {
      setError('Title is required');
      return;
    }

    try {
      await onAddTodo(title, description);
      setTitle('');
      setDescription('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-800 rounded-lg shadow-md">
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
        <input
          id="title"
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium mb-1">Description (Optional)</label>
        <textarea
          id="description"
          placeholder="Add more details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input"
          rows="3"
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Add Todo
      </button>
    </form>
  );
}