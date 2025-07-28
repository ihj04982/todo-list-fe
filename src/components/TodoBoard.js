import TodoItem from "./TodoItem";
import { Typography, Box, Paper } from "@mui/material";
import { AutoAwesomeSharp } from "@mui/icons-material";

const TodoBoard = ({ todoList, getTasks }) => {
  return (
    <Paper sx={{ p: 2, mt: 3, mb: 3 }}>
      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AutoAwesomeSharp sx={{ mr: 1 }} />
          Todo List
          <AutoAwesomeSharp sx={{ ml: 1 }} />
        </Typography>
        {todoList.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {todoList.map((item) => (
              <TodoItem key={item._id} item={item} todoList={todoList} getTasks={getTasks} />
            ))}
          </Box>
        ) : (
          <Paper sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              There is no Item to show
            </Typography>
          </Paper>
        )}
      </Box>
    </Paper>
  );
};

export default TodoBoard;
