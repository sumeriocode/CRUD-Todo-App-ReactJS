import { useState } from 'react';

import Header from "../../../components/header/Header";


interface TodoFormProps {
    onAddTodo: (Todo: TodoRequest) => void;
    onCloseModal: () => void;
}

const TodocreateOrUpdate = () => {

    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí puedes guardar el todo con el nombre en tu lógica de negocio
        console.log('Todo nombre:', name);
        setName(''); // Limpiamos el campo de nombre después de guardar el todo
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };


    return (
        <>
            <Header title="Create Todo" />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">



                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Street address</label>
                                        <div className="mt-2">
                                            <input type="text" value={name}
                                                onChange={handleChange} name="name" id="name" autoComplete="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>
                    </form>

                </div>
            </main>
        </>
    );
}

export default TodocreateOrUpdate;
