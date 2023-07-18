import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

export type TasksTypeProps = {
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    changeTaskStatus: (todolistID: string, status: boolean,id: string) => void
    removeTasks: (todolistId: string, id: string) => void
    todolistId: string
    task: TaskType
}

export const Task = React.memo( (props: TasksTypeProps) => {
    const removeTaskHandler = (id: string) => {
        props.removeTasks(props.todolistId, id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.todolistId,newIsDoneValue,props.task.id)
    }

    const onChangeTitleHandler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.changeTaskTitle, props.task.id, props.todolistId])

    // const testHandler = ((e: any) => changeStatusHandler(props.task.id, e))



    return <div> <li key={props.task.id}>
        <Checkbox className={props.task.isDone ? 'is-done' : ''}
                  onChange={onChangeHandler}
                  checked={props.task.isDone}
        />

        <EditableSpan title={props.task.title}
                      onChange={onChangeTitleHandler}
        />
        <IconButton onClick={() => removeTaskHandler(props.task.id)}
                    aria-label="delete">
            <Delete />
        </IconButton>
    </li>
    </div>

})
