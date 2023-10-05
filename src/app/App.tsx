import React, { useCallback, useEffect } from "react";
import "./App.css";
import {AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography,} from "@mui/material";
import { Menu } from "@mui/icons-material";
import {TodolistsList} from "features/TodolistsList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./store";
import { initializeAppTC } from "./app-reducer";
import { ErrorSnackbar } from "Components/ErrorSnackbar/ErrorSnackbar";
import {Route, Routes } from "react-router-dom";
import { logoutTC } from "features/Login/auth-reducer";
import { selectedIsLogin, selectInitialized, selectStatus } from "app/appSelectors";
import {Login} from "features/Login";



type AppPropsType = {
  demo: boolean;
};

const App = React.memo(({ demo = false, ...props }: AppPropsType) => {
  const dispatch: AppDispatch = useDispatch();
  let status = useSelector(selectStatus);
  let initialized = useSelector(selectInitialized);
  const isLogin = useSelector(selectedIsLogin);

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC(false));
  }, []);

  if (!initialized) {
    return (
        <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
          <CircularProgress />{" "}
        </div>
    )
  }

  return (
      <div className="App">
        <ErrorSnackbar />
        <AppBar position={"static"}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">Todolist</Typography>
            {isLogin && (
              <Button onClick={logoutHandler} color="inherit">
                Log out
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {status === "loading" && <LinearProgress />}
        <Container fixed>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<TodolistsList demo={demo} />} />
            <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>} />
          </Routes>
        </Container>
      </div>
  );
});
export default App;
