"use client";
import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    console.log("Đã thử đăng nhập");
    event.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BE_URL}/api/v1/auth/authenticate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        },
      );

      if (!response.ok) {
        // Xử lý lỗi, ví dụ hiển thị thông báo lỗi
        console.error("login failed:", response.statusText);
        return;
      }
      window.location.reload();
    } catch (error) {
      console.error("login error:", error);
    }
  };

  return (
    <Container className={"mt-[50px]"} maxWidth="sm">
      <Typography variant="h4" textAlign={"center"} gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className={"mt-[20px] h-[50px] bg-cyan-500"}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
        {/*<Grid container className={"mt-3 te"}>*/}
        {/*  <Grid item xs>*/}
        {/*    <Link href="#" variant="body2">*/}
        {/*      Forgot password?*/}
        {/*    </Link>*/}
        {/*  </Grid>*/}
        {/*  <Grid item>*/}
        {/*    <Link href="#" variant="body2">*/}
        {/*      {"Don't have an account? Sign Up"}*/}
        {/*    </Link>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </form>
    </Container>
  );
};

export default LoginForm;
