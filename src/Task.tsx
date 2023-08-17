import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatues, TaskType} from "./api/todolist-api";

export type TasksTypeProps = {
    changeTaskTitle: (id: string, newValue: string, todolistID: string) => void
    changeTaskStatus: (todolistID: string, status: TaskStatues,id: string) => void
    removeTasks: (todolistId: string, id: string) => void
    id: string
    task: TaskType
}

export const Task = React.memo( (props: TasksTypeProps) => {
    const removeTaskHandler = (id: string) => {
        props.removeTasks(props.id, id)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.id,newIsDoneValue ? TaskStatues.Completed : TaskStatues.New,props.task.id)
    }

    const onChangeTitleHandler = useCallback( (newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.id)
    },[props.changeTaskTitle, props.task.id, props.id])

    // const testHandler = ((e: any) => changeStatusHandler(props.task.id, e))



    return <div> <li key={props.task.id}>
        <Checkbox className={props.task.status === TaskStatues.Completed ? 'is-done' : ''}
                  onChange={onChangeHandler}
                  checked={props.task.status === TaskStatues.Completed}
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
