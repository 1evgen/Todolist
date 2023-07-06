import React, {ChangeEvent, useCallback, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}


export const EditableSpan = React.memo( (props: EditableSpanType) => {
    console.log('render EditableSpan')
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = ()=> {
        setEditMode(true);
        setTitle(props.title)
    }

    const activateViewMode =  () => {
        setEditMode(false);
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (

        editMode ?
            <TextField  value={title}
                        variant={'standard'}
                        onBlur={activateViewMode}
                        autoFocus
                        onChange={onChangeTitleHandler}
            /> : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})