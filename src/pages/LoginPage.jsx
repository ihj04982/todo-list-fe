import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Paper, Container } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "utils/api";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
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
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
        setError("");
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              color: "text.primary",
            }}
          >
            로그인
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
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            {error && <Typography color="error">{error}</Typography>}

            <Button type="submit" variant="contained" fullWidth>
              로그인
            </Button>

            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              계정이 없다면?{" "}
              <Link
                component={RouterLink}
                to="/register"
                sx={{
                  color: "primary.dark",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                회원가입 하기
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
