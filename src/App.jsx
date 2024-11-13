import { useState } from "react";
import Container from './Container';
import './App.css';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", isDone: false },
    { id: 1, content: "코딩 공부하기", isDone: false },
    { id: 2, content: "잠 자기", isDone: false },
  ]);

  return (
    <Container>
      <h1 className="todoTitle">To Do List</h1>
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </Container>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState('');
  return (
    <div className="new-todo-input">
      <input 
        placeholder="Write your todo"
        value={inputValue} 
        onChange={(event) => setInputValue(event.target.value)} 
      />
      <button
        onClick={() => {
          const newTodo = {
            id: Number(new Date()),
            content: inputValue,
            isDone: false
          };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        Add
      </button>
    </div>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
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
        el.id === todo.id ? { ...el, isDone: !el.isDone } : el
      )
    );
  };

  return (
    <li style={{ textDecoration: todo.isDone ? "line-through" : "none" }}>
      <input
        type="checkbox"
        checked={todo.isDone}
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
          <div className="btn-wrap">
            <button className="btn-edit" onClick={() => setIsEditing(true)}>수정</button>
            <button className="btn-delete"
              onClick={() => {
                setTodoList((prev) => prev.filter((el) => el.id !== todo.id));
              }}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
}

function EditTodo({ todo, setTodoList, setIsEditing }) {
  const [inputValue, setInputValue] = useState(todo.content);

  return (
    <div className="edit-todo-input">
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
          setIsEditing(false);
        }}
      >
        Edit
      </button>
      <button onClick={() => setIsEditing(false)}>Cancle</button>
    </div>
  );
}

export default App;
