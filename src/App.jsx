import { Routes, Route, Link } from "react-router-dom";
import TodoPage from "./TodoPage";
import TimerPage from "./TimerPage";
import { useEffect, useState } from "react";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Todo</Link>
        <Link to="/timer">Timer</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/timer" element={<TimerPage />} />
      </Routes>
    </div>
  );
}


export default App;
