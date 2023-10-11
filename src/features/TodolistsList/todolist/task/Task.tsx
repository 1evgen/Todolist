import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "Components/editableSpan/EditableSpan";
import { Delete } from "@mui/icons-material";
import { TaskStatuses, TaskType } from "api/todolist-api";
import {removeTaskTC} from "features/TodolistsList/task-actions";
import {AppDispatch} from "app/store";
import {useDispatch} from "react-redux";

export type TasksTypeProps = {
  changeTaskTitle: (id: string, newValue: string, todolistID: string) => void;
  changeTaskStatus: (todolistID: string, status: TaskStatuses, id: string) => void;
  id: string;
  task: TaskType;
  disabled: boolean;
};

export const Task = React.memo((props: TasksTypeProps) => {
  const dispatch: AppDispatch = useDispatch();


  const removeTaskHandler = (id: string) => {
    dispatch(removeTaskTC({todolistId: props.id, taskId: id}));
  };

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    props.changeTaskStatus(props.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.task.id);
  };

  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.id);
    },
    [props.changeTaskTitle, props.task.id, props.id],
  );

  return (
    <div>
      <li key={props.task.id}>
        <Checkbox
          className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
          onChange={onChangeStatusHandler}
          checked={props.task.status === TaskStatuses.Completed}
        />

        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
        <IconButton onClick={() => removeTaskHandler(props.task.id)} aria-label="delete" disabled={props.disabled}>
          <Delete />
        </IconButton>
      </li>
    </div>
  );
});
