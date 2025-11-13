'use client';

export default function TodoItem({ todo, onToggleComplete, onDeleteTodo }) {
  return (
    <li className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-3 shadow">
      <div 
        className="flex items-center cursor-pointer flex-1 mr-4"
        onClick={onToggleComplete}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
          className="mr-3 h-5 w-5 rounded text-blue-500 bg-gray-700 border-gray-600 focus:ring-blue-500"
        />
        <div>
          <span 
            className={`font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}
          >
            {todo.title}
          </span>
          {todo.description && (
            <p className={`text-sm ${todo.completed ? 'text-gray-600 line-through' : 'text-gray-400'}`}>
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <button 
        onClick={onDeleteTodo} 
        className="btn btn-danger"
      >
        Delete
      </button>
    </li>
  );
}