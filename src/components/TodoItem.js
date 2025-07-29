import api from "../utils/api";
import { Paper, Box, Typography, Checkbox, IconButton, Chip, Grid } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";

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
    <Paper
      sx={{
        opacity: item.isCompleted ? 0.7 : 1,
        transition: "opacity 0.2s ease-in-out",
        borderRadius: 10,
        backgroundColor: "primary.light",
        boxShadow: "none",
        border: "2px solid",
      }}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid size={{ xs: 1, md: 1 }}>
          <Checkbox checked={item.isCompleted} onChange={completeTask} color="success" />
        </Grid>
        <Grid size={{ xs: 3, md: 3 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            {item.category && <Chip label={item.category} size="small" color="secondary" variant="filled" />}
            {item.author && <Chip label={item.author.name} size="small" color="info.dark" variant="outlined" />}
          </Box>
        </Grid>

        <Grid size={{ xs: 7, md: 7 }}>
          <Box>
            <Typography
              variant="body1"
              sx={{
                textDecoration: item.isCompleted ? "line-through" : "none",
                color: item.isCompleted ? "text.secondary" : "text.primary",
              }}
            >
              {item.task}
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 1, md: 1 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={deleteTask} color="warning" size="small" aria-label="delete">
            <CancelOutlined />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TodoItem;
