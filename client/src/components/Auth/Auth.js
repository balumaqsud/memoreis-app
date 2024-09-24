import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Paper,
  Typography,
  Grid2,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import Input from "./Input";
import { signUp, signIn } from "../../actions/auth";

import GoogleSignInButton from "./GoogleLogin";

const Auth = () => {
  /////consts
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const intitialState = {
    firstname: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setSignUp] = useState(true);
  const [formData, setFormData] = useState(intitialState);

  /////functions
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  /////
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  /////
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /////
  const switchMode = () => {
    setSignUp((prevSignUp) => !prevSignUp);
    setShowPassword(false);
  };

  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LoginIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp ? (
              <Input
                name="confirmation"
                label="Confirm Password"
                type="password"
                handleChange={handleChange}
              />
            ) : null}
          </Grid2>
          <Button
            className={classes.submitt}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: "12px 0" }}
          >
            {isSignUp ? "Sign up" : "Sign in"}
          </Button>
          <GoogleSignInButton />
          <Grid2 container justifyContent="center">
            <Grid2 item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an Account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
