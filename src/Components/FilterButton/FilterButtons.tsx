import React, {useCallback} from "react";
import {Button} from "@mui/material";
import {FilterValueType} from "../../features/TodolistsList/todolistReducer";

type FilterButtonsType = {
    filter: FilterValueType
    changeFilter: (todolistID: string, titleButton: FilterValueType) => void
    id: string
}

export const FilterButtons = React.memo(  (props: FilterButtonsType) => {
    const onClickButtonAll = useCallback( () => props.changeFilter(props.id, 'all'),
        [props.changeFilter, props.id])
    const onClickButtonActive = useCallback( () => props.changeFilter(props.id, 'active'),
        [props.changeFilter,props.id])
    const onClickButtonCompleted = useCallback( () => props.changeFilter(props.id, 'completed'),
        [props.changeFilter, props.id])

    return (
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onClickButtonAll}>All
            </Button>
            <Button color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onClickButtonActive}>Active
            </Button>
            <Button color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onClickButtonCompleted}>Completed
            </Button>
        </div>
    )
})