import React, {ChangeEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}


export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode ?
            <input value={title}
                   onBlur={activateViewMode}
                   autoFocus
                   onChange={onChangeTitleHandler}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>


    )
}