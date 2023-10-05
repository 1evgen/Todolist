import {TodolistType} from "api/todolist-api";
import {RequestStatusType} from "app/app-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistTC, changeTodolistTC, fetchTodolistsTC, removeTodolistTC} from "features/TodolistsList/todolist-actions";


const initialState: Array<TodolistDomainType> = [];
export const sliceTodolists = createSlice({
    name: "todolists",
    initialState,
    reducers: {
        changeFilter(state, action: PayloadAction<{ id: string; filter: FilterValueType }>) {
            let todo = state.find((el) => el.id === action.payload.id);
            if (todo) {
                todo.filter = action.payload.filter;
            }
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) {
            let todo = state.find((el) => el.id === action.payload.id);
            if (todo) {
                todo.entityStatus = action.payload.entityStatus;
            }
        },
        clearTotdos(state, action: PayloadAction) {
            state.splice(0, state.length);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                if (action.payload) {
                    action.payload.todolist.forEach((tl) => {
                        state.push({...tl, filter: 'all', entityStatus: 'idle'})
                    })
                }
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                let index = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                if (action.payload) {
                    state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
                }
            })
            .addCase(changeTodolistTC.fulfilled, (state, action) => {
                if (action.payload) {
                    const {todolistId, title} = action.payload
                    let todo = state.find((el) => el.id === todolistId)
                    if (todo) {
                        todo.title = title}}
            })}
});

export const todolistsReducer = sliceTodolists.reducer;
export const {
    changeTodolistEntityStatus,
    changeFilter,
    clearTotdos,
} = sliceTodolists.actions;

export type FilterValueType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType;
    entityStatus: RequestStatusType;
};
