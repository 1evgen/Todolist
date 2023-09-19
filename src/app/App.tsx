import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type AppPropsType = {
    demo: boolean
}

const App = React.memo(({demo = false, ...props}:AppPropsType ) => {
    const dispatch: AppDispatch = useDispatch();
    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    let initialized = useSelector<AppRootStateType>(state => state.app.initialized)
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

    const logoutHandler = useCallback(()=> {
        dispatch(logoutTC())
    },[])

    if(!initialized){
        return <div style={{position:"fixed", top:'30%', textAlign:'center', width: '100%'}}>
            <CircularProgress /> </div>
    }

    return (
        <BrowserRouter>
        <div className="App">
             <ErrorSnackbar/>
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge='start' color='inherit' aria-label='menu'>
                        <Menu/>
                    </IconButton>
                    <Typography variant='h6'>
                        Todolist
                    </Typography>
                    {isLogin && <Button onClick={logoutHandler} color='inherit'>Log out</Button>}
                </Toolbar>
            </AppBar>

            {status === 'loading' &&  <LinearProgress/>}
            <Container fixed>
                <Routes>
                  <Route path='/login' element={<Login/>} />
                  <Route path='/' element={ <TodolistsList demo={demo}/>}/>
                  <Route path='*' element={<h1>404: PAGE NOT FOUND</h1>} />
                </Routes>
            </Container>
        </div>
        </BrowserRouter>
    );
})

export default App;
