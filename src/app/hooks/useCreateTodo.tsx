import { useState } from 'react';

type TodoRequest = {
  id?: number;
  name: string;
};

const useCreateTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const createTodo = async (todo: TodoRequest) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/v1/todo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setSuccessMessage(data.message || '');
        return { success: true, message: data.message || '' };
      } else {
        throw new Error(data.message || 'Error al crear la tarea');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Error al crear la tarea');
      return { success: false, message: error.message || 'Error al crear la tarea' };
    }
  };

  return { loading, error, successMessage, createTodo };
};

export default useCreateTodo;
