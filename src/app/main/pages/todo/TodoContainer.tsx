import { Suspense, useMemo, useState } from "react";
import TodoList from "./TodoList";
import useFetchTodos from "../../../hooks/useTodoApi";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/Header";

function TodoContainer() {

    const [searchTerm, setSearchTerm] = useState("");
    const navigation  =  useNavigate();

    const options = useMemo(() => {
        return { search: searchTerm };
    }, [searchTerm]);

    const { todos, loading } = useFetchTodos(options);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (page: unknown) => {
        console.log(page);

        // Otras lógicas para cargar los datos de la página seleccionada
    };

    return (<>
        <Header title="Todo List"/>
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">


                <div className="mb-4 flex items-center">
                    <input type="text" placeholder="Search" className="border border-gray-300 rounded-md py-2 px-4 w-full" onChange={handleSearchChange} />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2 rounded-md" onClick={()=> {
                        navigation('/create');
                    }}  >+</button>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    {loading ? <div>Loading...</div> : <TodoList
                        todos={todos}
                        totalPages={10}
                        currentPage={1}
                        onPageChange={handlePageChange}
                    />}
                </Suspense>

            </div>
        </main>
    </>
    );
}
export default TodoContainer;
