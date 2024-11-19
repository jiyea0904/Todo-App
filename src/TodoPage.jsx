import { useState, useRef, useEffect } from 'react';
import './App.css';

const TodoPage = () => {
  const [loading, todoData] = useFetch("http://localhost:3000/todo");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    if (!loading && todoData) {
      setTodo(todoData); // Update the state with fetched data
    }
  }, [loading, todoData]);

  return (
    <div className='container'>
      <h1>Todo List</h1>
      <TodoInput setTodo={setTodo} />
      <TodoList todo={todo} setTodo={setTodo} />
      <Advice />
    </div>
  );
};

const TodoInput = ({ setTodo }) => {
  const inputRef = useRef(null);

  const addTodo = () => {
    const newTodo = {
      id: Number(new Date()),
      content: inputRef.current.value,
    };
    fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((res) => setTodo((prev) => [...prev, res]));
    inputRef.current.value = ''; // Clear input field
  };

  return (
    <div className="new-todo-input">
      <input ref={inputRef} />
      <button onClick={addTodo}>Add</button>
    </div>
  );
};

const TodoList = ({ todo, setTodo }) => {
  return (
    <ul className="todo-list">
      {todo.map((el) => (
        <Todo key={el.id} todo={el} setTodo={setTodo} />
      ))}
    </ul>
  );
};

const Todo = ({ todo, setTodo }) => {
  const [isEditing, setIsEditing] = useState(false);

  const deleteTodo = () => {
    fetch(`http://localhost:3000/todo/${todo.id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setTodo((prev) => prev.filter((el) => el.id !== todo.id));
      }
    });
  };

  return (
    <li>
      {isEditing ? (
        <EditTodo todo={todo} setTodo={setTodo} setIsEditing={setIsEditing} />
      ) : (
        <>
          {todo.content}
          <div className="btn-wrap">
            <button className="btn-edit" onClick={() => setIsEditing(true)}>
              수정
            </button>
            <button className="btn-delete" onClick={deleteTodo}>
              삭제
            </button>
          </div>
        </>
      )}
    </li>
  );
};

const EditTodo = ({ todo, setTodo, setIsEditing }) => {
  const [inputValue, setInputValue] = useState(todo.content);

  const updateTodo = () => {
    fetch(`http://localhost:3000/todo/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...todo, content: inputValue }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodo((prev) =>
          prev.map((el) => (el.id === todo.id ? updatedTodo : el))
        );
        setIsEditing(false);
      });
  };

  return (
    <div className="edit-todo-input">
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={updateTodo}>Edit</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </div>
  );
};

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [url]);

  return [isLoading, data, error];
};

const Advice = () => {
  const [isLoading, data, error] = useFetch(
    "https://korean-advice-open-api.vercel.app/api/advice"
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {!isLoading && data?.message && (
        <>
          <div>{data.message}</div>
          <div>- {data.author || "Unknown"} -</div>
        </>
      )}
    </>
  );
};

export default TodoPage;
