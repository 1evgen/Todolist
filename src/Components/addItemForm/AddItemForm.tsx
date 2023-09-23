import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

type AddItemFormType = {
  addItemForm: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = React.memo((props: AddItemFormType) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const addTaskHandler = () => {
    if (title.trim() !== "") {
      props.addItemForm(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onClickEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    setError("");
  };

  return (
    <div>
      {/*<input value={title}*/}
      {/*       onChange={changeTitleHandler}*/}
      {/*       onKeyUp={onClickEnterHandler}*/}
      {/*       className={error ? 'error' : ''}*/}
      {/*/>*/}
      <TextField
        value={title}
        variant={"outlined"}
        label={"Type value"}
        onChange={changeTitleHandler}
        onKeyUp={onClickEnterHandler}
        error={!!error}
        helperText={error}
        disabled={props.disabled}
      />
      <IconButton color={"primary"} onClick={addTaskHandler} disabled={props.disabled}>
        <AddCircle />
      </IconButton>
      {/*{error && <div className='error-message'>{error}</div>}*/}
    </div>
  );
});
