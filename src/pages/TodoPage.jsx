import { useState, useEffect } from "react";
import api from "../utils/api";
import TodoBoard from "../components/TodoBoard";
import { Container, Grid, TextField, Button, Box, Paper, Typography, IconButton, Chip } from "@mui/material";
import styled from "@emotion/styled";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

const AppTitle = styled(Typography)(({ theme }) => ({
  textShadow: `1px 1px 1px ${theme.palette.text.primary}`,
}));

const TodoPage = ({ user, setUser }) => {
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
        getTasks();
        setTodoValue("");
        setCategoryValue("");
      } else {
        throw new Error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <Container>
      <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <IconButton title={user.name}>
              <PersonIcon color="primary" />
            </IconButton>
            <IconButton onClick={logout}>
              <LogoutIcon color="primary" />
            </IconButton>
          </div>
        )}
      </Box>
      <AppTitle
        variant="h1"
        sx={{
          mt: 2,
          color: "primary.main",
          textAlign: "center",
        }}
      >
        GROWTH
      </AppTitle>
      <AppTitle variant="h6" sx={{ mb: 2, color: "primary.main", textAlign: "center" }}>
        Track Your Growth
      </AppTitle>
      <Paper sx={{ p: 2, mt: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
          + Create Task +
        </Typography>
        <Box>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                placeholder="카테고리를 입력하세요"
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                placeholder="할일을 입력하세요"
                value={todoValue}
                onChange={(e) => setTodoValue(e.target.value)}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 1 }}>
              <Button fullWidth variant="contained" color="info" onClick={addTask} sx={{ borderRadius: 10 }}>
                추가
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <TodoBoard todoList={todoList} getTasks={getTasks} />
    </Container>
  );
};

export default TodoPage;
