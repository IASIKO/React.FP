import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../application";
import { authenticateUser } from "../../redux";
import { TextFieldComponent } from "../shared";

const generateLoginFormValues = () => {
  return {
    email: {
      value: "",
      required: true,
      error: "",
      validateInput: (email) =>
        email.includes("gmail.com") ? null : "email is not valid",
    },
    password: {
      value: "",
      required: true,
      error: "",
      validateInput: (password) =>
        password.length > 6
          ? null
          : "password should have at least 6 characters",
    },
  };
};

export const LoginForm = () => {
  const { formValues: loginFormValues, onInputChange } = useForm({
    defaultFormValues: generateLoginFormValues(),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (event) => {
    event.preventDefault();
    const email = loginFormValues.email.value;
    const password = loginFormValues.password.value;
    dispatch(
      authenticateUser({ formValues: { email, password }, isLogin: true })
    )
      .unwrap()
      .then(() => navigate("/"));
  };

  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onLogin} noValidate sx={{ mt: 1 }}>
            <TextFieldComponent
              value={loginFormValues.email.value}
              onChange={onInputChange}
              error={loginFormValues.email.error}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextFieldComponent
              value={loginFormValues.password.value}
              onChange={onInputChange}
              error={loginFormValues.password.error}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
