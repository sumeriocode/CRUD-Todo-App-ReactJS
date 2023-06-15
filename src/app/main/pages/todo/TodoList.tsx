import { Box, Dialog, DialogContent, DialogTitle } from "@mui/material";
import TodoListItem from "./TodoListItem";
import TodoListPagination from "./TodoListPagination";
import { useState } from "react";

type TodoListProps = {
    todos: Todo[] ;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onDelete: (todoId: number) => void;
};


function TodoList({ todos, totalPages, currentPage, onPageChange, onDelete }: TodoListProps) {
    const [todo, setTodo] = useState<TodoRequest>({ name: '' });
    const [open, setOpen] = useState(false);
    const handleOpen = (data: Todo) => {
        setTodo(data)
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return (<>
        {

            todos.length > 0 ? (
                <>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">Task Name</th>
                                <th className="py-2 px-4 border-b"></th>
                            </tr>
                        </thead>
                        <tbody> {
                            todos.map((item) => (<TodoListItem item={item} onDelete={onDelete} onView={(data) => handleOpen(data)} />))
                        } </tbody>
                    </table>
                    <TodoListPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={onPageChange}
                    />
                </>
            ) :
                (<div className="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" role="alert">
                    <svg className="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    <div>
                        <span className="font-medium">Ops!</span> La busqueda realizada no tiene resultados.
                    </div>
                </div>)
        }

        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Todo Item # {todo.id}</DialogTitle>
            <DialogContent>
                <form className="rounded-md">
                    <div className=" border-gray-900/10 ">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <div className="mt-2">
                                    <input type="text" value={todo.name}
                                        name="name" readOnly disabled id="name" className={`block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                                                `} />

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    </>);
}
export default TodoList;
