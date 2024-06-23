import { getTodoAction } from "@/actions/todo/todo.action";

export default function ClientComponentTest() {
  const handleClick = async () => {
    const result = await getTodoAction();
    console.log("result", result);
  };

  return (
    <div>
      <button onClick={handleClick}>Test server actions</button>
    </div>
  );
}
