import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TasksTypeProps = {
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    changeTaskStatus: (todolistID: string, status: boolean,id: string) => void
    removeTasks: (todolistID: string, id: string) => void
    id: string
    task: TaskType
}

export const Task = React.memo( (props: TasksTypeProps) => {
    const removeTaskHandler = (id: string) => {
        props.removeTasks(props.id, id)
    }
    const changeStatusHandler = useCallback( (id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.id, e.currentTarget.checked, id);
    }, [props.changeTaskStatus, props.id])

    const onChange = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.id)
    },[props.changeTaskTitle, props.task.id, props.id])

    const testHandler = useCallback ((e: any) => changeStatusHandler(props.task.id, e),[props.task.id])



    return <div> <li key={props.task.id}>
        <Checkbox className={props.task.isDone ? 'is-done' : ''}
                  onChange={testHandler}
                  checked={props.task.isDone}
        />

        <EditableSpan title={props.task.title}
                      onChange={onChange}
        />
        <IconButton onClick={() => removeTaskHandler(props.task.id)}
                    aria-label="delete">
            <Delete />
        </IconButton>
    </li>
    </div>

})
