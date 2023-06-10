import TodoListItem from "./TodoListItem";
import TodoListPagination from "./TodoListPagination";

type TodoListProps = {
    todos: Todo[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

function TodoList({ todos, totalPages, currentPage, onPageChange }: TodoListProps) {
    return (<>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Task Name</th>
                    <th className="py-2 px-4 border-b"></th>
                </tr>
            </thead>
            <tbody> {
                todos.map((item) => (<TodoListItem item={item} />))
            } </tbody>
        </table>

        <TodoListPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
        />
    </>);
}
export default TodoList;
