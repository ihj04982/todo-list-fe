import { useState } from "react";
import { Container, Paper, Box, TextField, Button, Typography, Link } from "@mui/material";
import api from "utils/api";
import { useNavigate, Link as RouterLink } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.secPassword) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
      const response = await api.post("/user", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        navigate("/login");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 1000,
          backgroundColor: "primary.main",
          borderRadius: 4,
          border: "2px solid",
          borderColor: "text.primary",
          boxShadow: "none",
          display: "flex",
          flexDirection: "row",
          gap: 4,
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
            Join & Grow
          </Typography>
          <Typography align="center" fontFamily="Nesatho">
            Start Your Growth Journey
          </Typography>
          <TextField
            label="이름"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="이메일 주소"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="비밀번호"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="비밀번호 확인"
            name="secPassword"
            type="password"
            value={formData.secPassword}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button color="info" type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            회원가입
          </Button>

          <Typography
            variant="body2"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mt: 2,
            }}
          >
            이미 계정이 있다면?{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              로그인 하기
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <img
            src="https://picsum.photos/400/500"
            alt="Register"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "400px",
              borderRadius: "8px",
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
