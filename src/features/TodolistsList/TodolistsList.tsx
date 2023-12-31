import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch} from "app/store";
import { TaskStatuses } from "api/todolist-api";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "Components/addItemForm/AddItemForm";
import { Todolist } from "./todolist/Todolist";
import { Navigate } from "react-router-dom";
import { selectedIsLogin, selectTasks, selectTodolist } from "app/appSelectors";
import {addTaskTC, updateTaskTC} from "features/TodolistsList/task-actions";
import {addTodolistTC, changeTodolistTC, fetchTodolistsTC, removeTodolistTC} from "features/TodolistsList/todolist-actions";
import {changeFilter, FilterValueType} from "features/TodolistsList/todolistReducer";


type TodolistsListPropsType = { demo?: boolean; };

export const TodolistsList: React.FC<TodolistsListPropsType> = ({ demo = false }) => {
  const todolists = useSelector(selectTodolist);
  const tasks = useSelector(selectTasks);
  const isLogin = useSelector(selectedIsLogin);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!demo || !isLogin) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, []);

  const changeTaskStatus = useCallback(
    (todolistID: string, status: TaskStatuses, id: string) => {
      dispatch(updateTaskTC({todolistId: todolistID,taskId: id,domainModel:{ status }}));
    },
    [dispatch],
  );

  const changeTodolistFilter = useCallback(
    (todolistID: string, titleButton: FilterValueType) => {
      dispatch(changeFilter({ id: todolistID, filter: titleButton }));
    },
    [dispatch],
  );

  const addTask = useCallback(
    (todolistID: string, title: string) => {
      dispatch(addTaskTC({todolistId: todolistID, title}));
    },
    [dispatch],
  );

  const removeTodolist = useCallback(
    (TodolistID: string) => {
      debugger;
      dispatch(removeTodolistTC(TodolistID));
    },
    [dispatch],
  );

  const addTodolist = useCallback(
    (title: string) => {
      const action = addTodolistTC(title);
      dispatch(action);
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    (id: string, newValue: string, todolistID: string) => {
      dispatch(updateTaskTC( {todolistId: todolistID, taskId: id, domainModel: { title: newValue }}));
    },
    [dispatch],
  );

  const changeTodolistTitle = useCallback(
    (todolistID: string, newValue: string) => {
      dispatch(changeTodolistTC({todolistId: todolistID, title: newValue}));
    },
    [dispatch],
  );

  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Grid container style={{ margin: "20px"  }}>
        <AddItemForm addItemForm={addTodolist} />
      </Grid>
      <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
        {todolists.map((tl) => {
          return (
            <Grid item>
              <Paper style={{ padding: "10px", width: '280px'}}>
                <Todolist
                  key={tl.id}
                  todolist={tl}
                  tasks={tasks[tl.id]}
                  // removeTasks={removeTasks}
                  changeTodolistFilter={changeTodolistFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
