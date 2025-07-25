import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import TodoBoard from "./components/TodoBoard";
import api from "./utils/api";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  const getTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTodoList(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isCompleted: false,
        category: categoryValue,
      });
      if (response.status === 200) {
        setTodoList([...todoList, response.data.data]);
        setTodoValue("");
      } else {
        throw new Error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={4}>
          <input
            type="text"
            placeholder="카테고리를 입력하세요"
            className="input-box"
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={6}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>

        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} getTasks={getTasks} />
    </Container>
  );
}

export default App;
