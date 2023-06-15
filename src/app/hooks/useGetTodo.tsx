import { useState } from 'react';

const useGetTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const getTodo = async (id: string) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`http://localhost:3000/api/v1/todo/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        return data;
      } else {
        throw new Error(data.message || 'Error al obtener la tarea');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || 'Error al obtener la tarea');
      throw error;
    }
  };

  return { loading, error, successMessage, getTodo };
};

export default useGetTodo;
