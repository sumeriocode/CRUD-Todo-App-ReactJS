import TodoListItem from "./TodoListItem";

function TodoList({ todos }: {
    todos: Array<Todo>
}) {
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
    </>);
}
export default TodoList;
