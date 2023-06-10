import { useEffect, useMemo, useState } from "react";
import TodoList from "./TodoList";
import useFetchTodos from "../../../hooks/useTodoApi";
import TodoForm from "./TodoForm";

function TodoContainer() {

    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);

    const options = useMemo(() => {
        return { search: searchTerm };
    }, [searchTerm]);

    const { todos, loading, error } = useFetchTodos(options);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleAddTask = (todo: TodoRequest) => {
        console.log(todo);

    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };



    return (<>

        <main className="container mx-auto px-4 py-8">
            <div className="mb-4 flex items-center">
                <input type="text" placeholder="Search" className="border border-gray-300 rounded-md py-2 px-4 w-full" onChange={handleSearchChange} />
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2 rounded-md" onClick={handleOpenModal}  >+</button>
            </div>
            <TodoList todos={todos} />
            <div className="flex justify-center mt-4">
                <ul className="flex space-x-2">
                    <li>
                        <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">1</a>
                    </li>
                    <li>
                        <a href="#" className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md">2</a>
                    </li>
                    <li>
                        <a href="#" className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md">3</a>
                    </li>
                </ul>
            </div>
        </main>
        {showModal && (
            <TodoForm onAddTodo={handleAddTask} onCloseModal={handleCloseModal} />
        )}
    </>
    );
}
export default TodoContainer;
