import React, { useCallback } from "react";
import { Button } from "@mui/material";
import { FilterValueType } from "features/TodolistsList/todolistReducer";

type FilterButtonsType = {
  filter: FilterValueType;
  changeTodolistFilter: (todolistID: string, titleButton: FilterValueType) => void;
  id: string;
};

export const FilterButtons = React.memo((props: FilterButtonsType) => {
  const onClickButtonAll = useCallback(
    () => props.changeTodolistFilter(props.id, "all"),
    [props.changeTodolistFilter, props.id],
  );
  const onClickButtonActive = useCallback(
    () => props.changeTodolistFilter(props.id, "active"),
    [props.changeTodolistFilter, props.id],
  );
  const onClickButtonCompleted = useCallback(
    () => props.changeTodolistFilter(props.id, "completed"),
    [props.changeTodolistFilter, props.id],
  );

  return (
    <div style={{paddingTop: '10px'}}>
      <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onClickButtonAll}>
        All
      </Button>
      <Button
        color={"primary"}
        variant={props.filter === "active" ? "contained" : "text"}
        onClick={onClickButtonActive}
      >
        Active
      </Button>
      <Button
        color={"secondary"}
        variant={props.filter === "completed" ? "contained" : "text"}
        onClick={onClickButtonCompleted}
      >
        Completed
      </Button>
    </div>
  );
});
