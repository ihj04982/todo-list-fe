import { useState } from "react";
import { Box, TextField, Button, Typography, Link, Paper, Container } from "@mui/material";
import { Link as RouterLink, useNavigate, Navigate } from "react-router-dom";
import api from "utils/api";

const LoginPage = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/user/login", formData);
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setError("");
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          backgroundColor: "primary.main",
          borderRadius: 4,
          border: "2px solid",
          borderColor: "text.primary",
          boxShadow: "none",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography variant="h3" align="center" fontFamily="LovelaceScript">
            Welcome Back
          </Typography>
          <Typography align="center" fontFamily="Nesatho">
            Continue Your Growth Journey
          </Typography>
          <TextField
            fullWidth
            label="이메일 주소"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
            margin="normal"
          />

          {error && <Typography color="error">{error}</Typography>}

          <Button color="info" type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            로그인
          </Button>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mt: 2,
            }}
          >
            계정이 없다면?{" "}
            <Link
              component={RouterLink}
              to="/register"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              회원가입 하기
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
