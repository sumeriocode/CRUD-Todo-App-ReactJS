import { useState } from 'react';

type FetchTodosOptions = {
    limit?: number;
    page?: number;
    search?: string;
};

const buildQueryString = (params: Record<string, any>) => {
    const query = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
    return query ? `?${query}` : '';
};

const useFetchTodos = () => {
    const urlApi = 'http://localhost:3000/api/v1/todo';
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTodos = async (options: FetchTodosOptions = {}) => {
        try {
            setLoading(true);

            const queryParams = buildQueryString(options);
            const url = `${urlApi}${queryParams}`;

            const response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                const data: FetchTodosResponse  = await response.json();
                return data;
            } else {
                throw new Error('Failed to fetch todos');
            }
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createTodo = async (todo: TodoRequest) => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
    
        try {
          const response = await fetch(`${urlApi}`, {
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
        } catch (error: any) {
          setLoading(false);
          setError(error.message || 'Error al crear la tarea');
          return { success: false, message: error.message || 'Error al crear la tarea' };
        }
      };

      const deleteTodo = async (id: string) => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
    
        try {
          const response = await fetch(`${urlApi}/${id}`, {
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
        } catch (error: any) {
          setLoading(false);
          setError(error.message || 'Error al eliminar la tarea');
          return { success: false, message: error.message || 'Error al eliminar la tarea' };
        }
      };
 
      const getTodo = async (id: string) => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
    
        try {
          const response = await fetch(`${urlApi}/${id}`, {
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
        } catch (error: any) {
          setLoading(false);
          setError(error.message || 'Error al obtener la tarea');
          throw error;
        }
      };

      const updateTodo = async (id: string, todo: TodoRequest) => {
        setLoading(true);
        setError('');
        setSuccessMessage('');
    
        try {
          const response = await fetch(`${urlApi}/${id}`, {
            method: 'PUT',
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
            throw new Error(data.message || 'Error al actualizar la tarea');
          }
        } catch (error: any) {
          setLoading(false);
          setError(error.message || 'Error al actualizar la tarea');
          return { success: false, message: error.message || 'Error al actualizar la tarea' };
        }
      };

    return { fetchTodos, getTodo, createTodo, deleteTodo , updateTodo, loading, error, successMessage };
};

export default useFetchTodos;
