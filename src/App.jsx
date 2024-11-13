import { useState } from "react";
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: '밥먹기', isCompleted: false },
    { id: 1, content: '코딩 공부하기', isCompleted: false },
  ]);

  return (
    <>
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState('');
  return (
    <div>
      <input 
        value={inputValue} 
        onChange={(event) => setInputValue(event.target.value)} 
      />
      <button
        onClick={() => {
          const newTodo = {
            id: Number(new Date()),
            content: inputValue,
            isCompleted: false
          };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleCheckboxChange = () => {
    setTodoList((prev) =>
      prev.map((el) =>
        el.id === todo.id ? { ...el, isCompleted: !el.isCompleted } : el
      )
    );
  };

  return (
    <li style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        <EditTodo
          todo={todo}
          setTodoList={setTodoList}
          setIsEditing={setIsEditing}
        />
      ) : (
        <>
          {todo.content}
          <button onClick={() => setIsEditing(true)}>수정</button>
          <button
            onClick={() => {
              setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
            }}
          >
            삭제
          </button>
        </>
      )}
    </li>
  );
}

function EditTodo({ todo, setTodoList, setIsEditing }) {
  const [inputValue, setInputValue] = useState(todo.content);

  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          setTodoList((prev) =>
            prev.map((el) =>
              el.id === todo.id ? { ...el, content: inputValue } : el
            )
          );
          setIsEditing(false); // 수정 모드 종료
        }}
      >
        저장
      </button>
      <button onClick={() => setIsEditing(false)}>취소</button>
    </>
  );
}

export default App;
