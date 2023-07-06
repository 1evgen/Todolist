import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddCircle} from "@mui/icons-material";

type AddItemFormType = {
    addItemForm: (title:string) => void
}
export const AddItemForm = React.memo( (props: AddItemFormType) => {
    console.log('render AddItemForm')
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')


    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItemForm(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onClickEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }

    };

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={changeTitleHandler}*/}
            {/*       onKeyUp={onClickEnterHandler}*/}
            {/*       className={error ? 'error' : ''}*/}
            {/*/>*/}
            <TextField value={title}
                       variant={'outlined'}
                       label={'Type value'}
                       onChange={changeTitleHandler}
                       onKeyUp={onClickEnterHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton color={"primary"}
                        onClick={addTaskHandler}><AddCircle/></IconButton>
            {/*{error && <div className='error-message'>{error}</div>}*/}
        </div>
    )


})