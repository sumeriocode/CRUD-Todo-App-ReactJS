import { useEffect, useState } from 'react';

import Header from "../../../components/header/Header";
import useCreateTodo from '../../../hooks/useCreateTodo';
import useUpdateTodo from '../../../hooks/useUpdateTodo';

import { useNavigate, useParams } from 'react-router-dom';
import useGetTodo from '../../../hooks/useGetTodo';


const TodocreateOrUpdate = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [name, setName] = useState('');
    const [success, setSuccess] = useState(Boolean);
    const {createTodo } = useCreateTodo();
    const {getTodo } = useGetTodo();
    const { updateTodo } = useUpdateTodo();
    const { todoId } = useParams();
    const navigation = useNavigate();


    useEffect(() => {
        if (todoId) {
            // Si hay un ID de todo en la URL, obtener los detalles del todo y establecer los valores en el formulario
            getTodo(todoId)
                .then((todo) => {
                    setName(todo.name);
                })
                .catch((error) => {
                    // Manejar el error al obtener los detalles del todo
                });
        }
    }, [todoId]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            const todo: TodoRequest = { name };
            if (todoId) {
                // Si hay un ID de todo en la URL, actualizar el todo existente
                updateTodo(todoId, todo)
                    .then((result) => {
                        if (result.success) {
                            setSuccess(true);
                            setTimeout(() => {
                                navigation('/');
                            }, 2000);
                        }
                    })
                    .catch((error) => {
                        // Manejar el error al actualizar el todo
                    });
            } else {
                // Si no hay un ID de todo en la URL, crear un nuevo todo
                createTodo(todo)
                    .then((result) => {
                        if (result.success) {
                            setName('');
                            setSuccess(true);
                            setTimeout(() => {
                                navigation('/');
                            }, 2000);
                        }
                    })
                    .catch((error) => {
                        // Manejar el error al crear un nuevo todo
                    });
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        if (name.trim() === '') {
            errors.name = 'Name is required';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    return (
        <>
            <Header title={todoId? 'Update Todo': 'Create Todo'} />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {
                        success ? (
                            <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <span className="font-medium">Success!</span> Task save successful.
                            </div>
                        ) : (null)
                    }
                    {
                        errors.name ? (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">Ops!</span> Fields are requerid.
                          </div>
                        ) : (null)
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                        <div className="mt-2">
                                            <input type="text" value={name} onChange={handleChange}
                                                name="name" id="name" className={`block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.name ? 'border border-red-500 ' : ''
                                                    }`} />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => { navigation('/') }} >Cancel</button>
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                {todoId? 'Update': 'Save'}
                            </button>
                        </div>
                    </form>

                </div>
            </main>
        </>
    );
}

export default TodocreateOrUpdate;
