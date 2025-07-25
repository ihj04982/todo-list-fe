import React from "react";
import { Col, Row } from "react-bootstrap";
import api from "../utils/api";

const TodoItem = ({ item, getTasks }) => {
  const deleteTask = async () => {
    try {
      const response = await api.delete(`/tasks/${item._id}`);
      if (response.status === 200) {
        console.log("Task deleted successfully");
        getTasks();
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const completeTask = async () => {
    try {
      const response = await api.put(`/tasks/${item._id}`, {
        isCompleted: !item.isCompleted,
      });
      if (response.status === 200) {
        console.log("성공");
        getTasks();
      } else {
        throw new Error("Failed to complete task");
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className="todo-content">{item.category}</div>
          <div className="todo-content">{item.task}</div>
          <div>
            <button className="button-delete" onClick={deleteTask}>
              삭제
            </button>
            <button className="button-delete" onClick={completeTask}>
              {item.isCompleted ? "완료" : "진행중"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
