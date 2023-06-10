import React, { useState } from 'react';


interface TodoFormProps {
    onAddTodo: (Todo: TodoRequest) => void;
    onCloseModal: () => void;
}

function TodoForm({ onAddTodo, onCloseModal }: TodoFormProps) {
    const [todoName, setTodoName] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoName(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const newTodo: TodoRequest = {
            name: todoName,
        };
        console.log('asaas');

        onAddTodo(newTodo);
        setTodoName('');
        onCloseModal();
    };

    return (
        <div className="fixed z-10 inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto">
            <div className="relative bg-white rounded-lg p-8">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            value={todoName}
                            onChange={handleInputChange}
                            placeholder="Ingrese una nueva tarea"
                            className="border border-gray-300 rounded-md py-2 px-4 w-full"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 ml-2 rounded-md"
                        >
                            Agregar
                        </button>
                    </div>
                </form>
                <button
                    onClick={onCloseModal}
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default TodoForm;
