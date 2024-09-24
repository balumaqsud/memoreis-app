import React, { useState, useEffect } from "react";
import memories from "../../images/memories.png";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import useStyles from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constants/constants";

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const token = user?.jti;

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  const logout = () => {
    dispatch({ type: LOGOUT });

    navigate("/");
    window.location.reload();

    setUser(null);
  };

  return (
    <AppBar
      className={classes.AppBar}
      position="static"
      color="inherit"
      style={{ flexDirection: "row" }}
    >
      <div className="brandContainer">
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
        >
          Memories
        </Typography>

        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className="purple" alt={user.name} scr={user.picture}>
              {user.name?.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            sign in/up
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
