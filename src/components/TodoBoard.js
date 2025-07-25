import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, getTasks }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((item) => <TodoItem key={item._id} item={item} todoList={todoList} getTasks={getTasks} />)
      ) : (
        // todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
};

export default TodoBoard;
