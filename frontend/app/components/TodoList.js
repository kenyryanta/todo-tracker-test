import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggleComplete, onDeleteTodo }) {
  if (todos.length === 0) {
    return <p className="text-center text-gray-500">No todos yet. Add one above!</p>;
  }

  return (
    <ul className="list-none p-0">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={() => onToggleComplete(todo.id, todo.completed)}
          onDeleteTodo={() => onDeleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
}