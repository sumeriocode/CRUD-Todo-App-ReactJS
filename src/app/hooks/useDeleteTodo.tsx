import { useState } from 'react';

type TodoRequest = {
  id?: number;
  name: string;
};

const useDeleteTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const deleteTodo = async (id: string) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`http://localhost:3000/api/v1/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        setSuccessMessage(data.message || '');
        return { success: true, message: data.message || '' };
      } else {
        throw new Error(data.message || 'Error al eliminar la tarea');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Error al eliminar la tarea');
      return { success: false, message: error.message || 'Error al eliminar la tarea' };
    }
  };

  return { loading, error, successMessage, deleteTodo };
};

export default useDeleteTodo;
