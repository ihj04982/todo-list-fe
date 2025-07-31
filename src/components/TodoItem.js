import api from "../utils/api";
import { Paper, Box, Typography, Checkbox, IconButton, Chip, useTheme, useMediaQuery } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";

const TodoItem = ({ item, getTasks }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const deleteTask = async () => {
    try {
      const response = await api.delete(`/tasks/${item._id}`);
      if (response.status === 200) {
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
        backgroundColor: "primary.light",
        boxShadow: "none",
        border: "2px solid",
        p: 1.5,
        borderRadius: isMobile ? 2 : 4,
      }}
    >
      {isMobile ? (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Checkbox checked={item.isCompleted} onChange={completeTask} color="success" size="small" />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1, flex: 1 }}>
            {(item.category || item.author) && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {item.category && (
                  <Chip
                    label={item.category}
                    size="small"
                    color="secondary"
                    variant="filled"
                    sx={{ fontSize: "0.7rem", height: "20px" }}
                  />
                )}
                {item.author && (
                  <Chip
                    label={item.author.name}
                    size="small"
                    color="info.dark"
                    variant="outlined"
                    sx={{ fontSize: "0.7rem", height: "20px" }}
                  />
                )}
              </Box>
            )}
            <Typography
              variant="body2"
              sx={{
                textDecoration: item.isCompleted ? "line-through" : "none",
                color: item.isCompleted ? "text.secondary" : "text.primary",
                flex: 1,
                wordBreak: "break-word",
              }}
            >
              {item.task}
            </Typography>
          </Box>
          <IconButton onClick={deleteTask} color="warning" size="small" aria-label="delete">
            <CancelOutlined fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Checkbox checked={item.isCompleted} onChange={completeTask} color="success" size="small" />

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: item.isCompleted ? "line-through" : "none",
                  color: item.isCompleted ? "text.secondary" : "text.primary",
                  flex: 1,
                  minWidth: 0,
                  wordBreak: "break-word",
                }}
              >
                {item.task}
              </Typography>

              <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                {item.category && (
                  <Chip
                    label={item.category}
                    size="small"
                    color="secondary"
                    variant="filled"
                    sx={{ fontSize: "0.7rem", height: "20px" }}
                  />
                )}
                {item.author && (
                  <Chip
                    label={item.author.name}
                    size="small"
                    color="info.dark"
                    variant="outlined"
                    sx={{ fontSize: "0.7rem", height: "20px" }}
                  />
                )}
              </Box>
            </Box>
          </Box>

          <IconButton onClick={deleteTask} color="warning" size="small" aria-label="delete">
            <CancelOutlined fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
};

export default TodoItem;
