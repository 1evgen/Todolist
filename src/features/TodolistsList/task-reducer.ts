import {TasksStateType} from "trash/App";
import {TaskPriorities, TaskStatuses} from "api/todolist-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTaskTC, fetchTasks, removeTaskTC, updateTaskTC} from "features/TodolistsList/task-actions";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from "features/TodolistsList/todolist-actions";

// Reducer
const initialState: TasksStateType = {};
const sliceTask = createSlice({
    name: "tasks",
    initialState,
    reducers:
        {
            clearAllTasks(state, action: PayloadAction) {
                for (let elem in state) {state[elem] = [];}
            },
        },
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistTC.fulfilled, (state, action) => {
                if(action.payload){state[action.payload.todolist.id] = []}
            })
            .addCase(removeTodolistTC.fulfilled, (state, action) => {
                delete state[ action.payload.todolistId]
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                if(action.payload){
                    action.payload.todolist.forEach((tl) => (state[tl.id] = []))
                }
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                if (action.payload) {
                    state[action.payload.todolistId] = action.payload.tasks
                }
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                let index = state[action.payload.todolistId].findIndex((i) => i.id === action.payload.taskId)
                if (index !== -1) {
                    state[action.payload.todolistId].splice(index, 1);
                }
            })
            .addCase(addTaskTC.fulfilled, (state, action) => {
                if (action.payload) {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                }
            })
            .addCase(updateTaskTC.fulfilled, (state, action) => {
                if(action.payload){
                    const tasks = state[action.payload.todolistId];
                    const index = tasks.findIndex((t) => t.id === action.payload.taskId);
                    if (index !== -1) {
                        tasks[index] = {...tasks[index], ...action.payload.model};}}})
    },
})
export const tasksReducer = sliceTask.reducer;
export const {clearAllTasks} = sliceTask.actions;
export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};
