import { useNavigate } from "react-router-dom";

function TodoListItem({ item }: {
  item: Todo
}) {
  const navigation = useNavigate();
  return (<>
    <tr>
      <td className="py-2 px-4 border-b"> {
        item.name
      }</td>
      <td className="py-2 px-4 border-b flex justify-end space-x-2">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={()=> {navigation(`/create/${item.id}`)}} >Modify</button>
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">Delete</button>
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md">View</button>
      </td>
    </tr>
  </>);
}
export default TodoListItem;
