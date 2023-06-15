import { useState, useEffect } from 'react';

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

const useFetchTodos = (options: FetchTodosOptions = {}) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        currentPage: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalItems: 0,
        totalPages: 0
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchTodos = async () => {
        try {
            setLoading(true);

            const queryParams = buildQueryString(options);
            const url = `http://localhost:3000/api/v1/todo${queryParams}`;

            const response = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                },
            });

            if (response.ok) {
                const data: FetchTodosResponse = await response.json();
                setTodos(data.items);
                setPagination(data.meta)
            } else {
                throw new Error('Failed to fetch todos');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [options]);

    const refreshTodos = () => {
        fetchTodos();
    };

    return { todos, pagination, loading, error, refreshTodos };
};

export default useFetchTodos;
