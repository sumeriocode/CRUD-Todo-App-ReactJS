import { Suspense, useEffect, useMemo, useState } from "react";
import TodoList from "./TodoList";
import useFetchTodos from "../../../hooks/useFetchTodos";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/Header";



function TodoContainer() {

   
    
    const [todos, setTodos] = useState<any>([]);
    const [pagination, setPagination] = useState<any>();

    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const navigation = useNavigate();
    const { fetchTodos, deleteTodo, loading } = useFetchTodos();

    const options = useMemo(() => {
        return { limit: limit, page: page, search: searchTerm };
    }, [searchTerm, page, limit]);


    const onLoad = () => {
        fetchTodos(options).then((data)=> {
            setTodos(data?.items)
            setPagination(data?.meta)
        });
    }

    useEffect(() => {
        onLoad();
    }, [options]);


    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (page: number) => {
        setPage(page);
    };


    const handlePageSizeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const pageSize = Number(event.target.value);
        setLimit(pageSize);
        setPage(1); // Reset page to 1 when changing page size
    };

    const handleDeleteTodo = async (id: number) => {
        const response = await deleteTodo(String(id));

        if (response.success) {
            onLoad();
        }
    };

    return (<>
        <Header title="Todo List" />
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">


                <div className="mb-4 flex items-center">
                    <input type="text" placeholder="Search" className="border border-gray-300 rounded-md py-2 px-4 w-full" onChange={handleSearchChange} />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2 rounded-md" onClick={() => {
                        navigation('/create');
                    }}  >+</button>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <label htmlFor="page-size-select" className="mr-2">
                            Page Size:
                        </label>
                        <select
                            id="page-size-select"
                            className="border border-gray-300 rounded-md py-2 px-4"
                            value={limit}
                            onChange={handlePageSizeChange}
                        >
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>

                    <p className="text-gray-500 text-sm">Total: {pagination?.totalItems} items</p>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    {loading ? <div>Loading...</div> : <TodoList
                        todos={todos}
                        totalPages={pagination?.totalPages}
                        currentPage={pagination?.currentPage}
                        onPageChange={handlePageChange}
                        onDelete={(id) => handleDeleteTodo(id)}

                    />}
                </Suspense>

            </div>
        </main>

    </>
    );
}
export default TodoContainer;
