import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {
    addTodolistTC,
    changeFilterAC,
    changeTodolistTC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolistReducer";
import {TaskStatuses} from "../../api/todolist-api";
import {addTaskTC, removeTaskTS, updateTaskTC} from "./task-reducer";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../Components/addItemForm/AddItemForm";
import {Todolist} from "./todolist/Todolist";
import {TasksStateType} from "../../app/App";
import {Navigate} from "react-router-dom";

type TodolistsListPropsType = {
        demo?: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false})=> {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        if (!demo) {
            return;
        }
        dispatch(fetchTodolistsTC())

    }, [])
    const changeTaskStatus = useCallback((todolistID: string, status: TaskStatuses, id: string,) => {
        dispatch(updateTaskTC(todolistID, id, {status}))
    }, [dispatch])

    const removeTasks = useCallback((todolistID: string, id: string) => {
        dispatch(removeTaskTS(todolistID, id))
    }, [dispatch])

    const changeFilter = useCallback((todolistID: string, titleButton: FilterValueType) => {
        dispatch(changeFilterAC(todolistID, titleButton))
    }, [dispatch])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskTC(todolistID, title))
    }, [dispatch])

    const removeTodolist = useCallback((TodolistID: string) => {
        dispatch(removeTodolistTC(TodolistID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistTC(title)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newValue: string, todolistID: string) => {
        dispatch(updateTaskTC(todolistID, id, {title: newValue}))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistID: string, newValue: string) => {
        dispatch(changeTodolistTC(todolistID, newValue))
    }, [dispatch])

    if(!isLogin){
      return  <Navigate to='/login'/>
    }
    return (
        <>
            <Grid container style={{margin: '10px'}}>
                <AddItemForm addItemForm={addTodolist}/>
            </Grid>
            <Grid container spacing={10}>
                {
                    todolists.map(tl => {
                        return <Grid item>
                            <Paper style={{padding: "20px"}}>
                                <Todolist key={tl.id}
                                          todolist={tl}
                                          tasks={tasks[tl.id]}
                                          removeTasks={removeTasks}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          removeTodolist={removeTodolist}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodolistTitle={changeTodolistTitle}
                                          demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })}
            </Grid>
        </>
    )
}