import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItemForm: (title:string) => void
}
export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState('')


    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addItemForm(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    };
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
            <input value={title}
                   onChange={changeTitleHandler}
                   onKeyUp={onClickEnterHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )


}