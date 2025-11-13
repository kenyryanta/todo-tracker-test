const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper untuk fetch
const fetchApi = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_URL}${url}`, options);
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Something went wrong');
    }

    // Handle 204 No Content (untuk DELETE)
    if (res.status === 204) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error(`API Error on ${options.method || 'GET'} ${url}:`, error.message);
    throw error; // Lempar ulang agar komponen bisa menangani
  }
};

export const getTodos = () => {
  return fetchApi('/todos');
};

export const createTodo = (title, description) => {
  return fetchApi('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });
};

export const updateTodo = (id, data) => {
  return fetchApi(`/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

export const deleteTodo = (id) => {
  return fetchApi(`/todos/${id}`, {
    method: 'DELETE',
  });
};