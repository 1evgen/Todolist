import {TasksStateType} from "trash/App";
import {addTodolistTC, changeTodolistEntityStatus, fetchTodolistsTC, removeTodolistTC} from "./todolistReducer";
import {TaskPriorities, TaskStatuses, todolistApi, UpdateTaskModelType} from "api/todolist-api";
import {setAppStatus} from "app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtilit";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {createAppAsyncThunk} from "utils/create-app-asynk";

// Reducer
const initialState: TasksStateType = {};
export const fetchTasks = createAppAsyncThunk('tasks/fetchTask', async (todolistId: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        let res = await todolistApi.getTasks(todolistId);
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {tasks: res.data.items, todolistId}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleServerNetworkError(thunkAPI.dispatch, error.message);
        } else {
            throw Error('Some Error !')
        }
    }
})

export const removeTaskTC = createAppAsyncThunk('tasks/removeTask',
    async (arg: { taskId: string; todolistId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatus({status: "loading"}));
        thunkAPI.dispatch(changeTodolistEntityStatus({id: arg.todolistId, entityStatus: "loading"}));
        try {
            let response = await todolistApi.removeTask(arg.todolistId, arg.taskId)
            if (response.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
                return {taskId: arg.taskId, todolistId: arg.todolistId}
            } else {
                handleServerAppError(thunkAPI.dispatch, response.data);
                return thunkAPI.rejectWithValue(null)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                handleServerNetworkError(thunkAPI.dispatch, error.message);
                return thunkAPI.rejectWithValue(null)
            } else {
                throw Error('Some Error !')
            }
        } finally {
            thunkAPI.dispatch(changeTodolistEntityStatus({id: arg.todolistId, entityStatus: "idle"}));
        }
    })

export const addTaskTC = createAppAsyncThunk('tasks/addTask',
    async (arg: { todolistId: string, title: string }, thunkAPI) => {
        try {
            thunkAPI.dispatch(setAppStatus({status: "loading"}));
            let response = await todolistApi.createTask(arg.todolistId, arg.title)
            if (response.data.resultCode === 0) {
                const newTask = response.data.data.item
                thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
                return {task: newTask}
            } else {
                handleServerAppError(thunkAPI.dispatch, response.data);
                return thunkAPI.rejectWithValue(null)
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                handleServerNetworkError(thunkAPI.dispatch, error.message);
                return thunkAPI.rejectWithValue(null)
            } else {
                throw Error('Error is occurred')
            }
        }
    })

export const updateTaskTC = createAppAsyncThunk('tasks/updateTask',
    async (arg:{todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType}, thunkAPI) => {
        const state = thunkAPI.getState().tasks[arg.todolistId].find((el)=> el.id === arg.taskId)
        if (!state) {
            return  thunkAPI.rejectWithValue(null)
        }
        const model: UpdateTaskModelType = {
            title: state.title,
            deadline: state.deadline,
            status: state.status,
            description: state.description,
            priority: state.priority,
            startDate: state.startDate,
            ...arg.domainModel,
        };
        try{
            thunkAPI.dispatch(setAppStatus({status: "loading"}));
            let response = await todolistApi.updateTask(arg.todolistId, arg.taskId, model)
            if(response.data.resultCode === 0){
               thunkAPI.dispatch(setAppStatus({status: "succeeded"}));
               return {todolistId: arg.todolistId, taskId: arg.taskId, model}
            }else {
                handleServerAppError(thunkAPI.dispatch, response.data)
                return  thunkAPI.rejectWithValue(null)
            }
        } catch (error){
            if(axios.isAxiosError(error)){
                handleServerNetworkError(thunkAPI.dispatch, error.message)
                return  thunkAPI.rejectWithValue(null)
            } else {
                throw Error('some error is occurred !')
            }
        }
})


const sliceTask = createSlice({
    name: "tasks",
    initialState,
    reducers:
        {
            clearAllTasks(state, action: PayloadAction) {
                for (let elem in state) {
                    state[elem] = [];
                }
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

// export const addTaskTC_ =
//     (todolistId: string, title: string): AppThunk =>
//         (dispatch) => {
//             dispatch(setAppStatus({status: "loading"}));
//             todolistApi
//                 .createTask(todolistId, title)
//                 .then((resp) => {
//                     if (resp.data.resultCode === 0) {
//                         dispatch(addTaskAC({task: resp.data.data.item}));
//                         dispatch(setAppStatus({status: "succeeded"}));
//                     } else {
//                         handleServerAppError(dispatch, resp.data);
//                     }
//                 })
//                 .catch((error) => {
//                     handleServerNetworkError(dispatch, error.message);
//                 });
//         };

// export const removeTaskTS =
//     (todolistId: string, taskId: string): AppThunk =>
//         (dispatch: Dispatch) => {
//             dispatch(setAppStatus({status: "loading"}));
//             dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: "loading"}));
//             todolistApi
//                 .removeTask(todolistId, taskId)
//                 .then((response) => {
//                     if (response.data.resultCode === 0) {
//                         dispatch(removeTaskAC({taskID: taskId, todolistID: todolistId}));
//                         dispatch(setAppStatus({status: "succeeded"}));
//                     } else {
//                         handleServerAppError(dispatch, response.data);
//                     }
//                 })
//                 .catch((error) => {
//                     handleServerNetworkError(dispatch, error.message);
//                 })
//                 .finally(() => {
//                     dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: "idle"}));
//                 });
//         };

// export const updateTaskTC_ =
//     (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
//         (dispatch: Dispatch, getState: () => AppRootStateType) => {
//             let state = getState().tasks[todolistId].find((el) => el.id === taskId);
//             if (!state) {
//                 return new Error("something wrong!");
//             }
//             const model: UpdateTaskModelType = {
//                 title: state.title,
//                 deadline: state.deadline,
//                 status: state.status,
//                 description: state.description,
//                 priority: state.priority,
//                 startDate: state.startDate,
//                 ...domainModel,
//             };
//             dispatch(setAppStatus({status: "loading"}));
//             todolistApi
//                 .updateTask(todolistId, taskId, model)
//                 .then((res) => {
//                     if (res.data.resultCode === 0) {
//                         dispatch(updateTaskAC({todolistId, taskId, model}));
//                         dispatch(setAppStatus({status: "succeeded"}));
//                     } else {
//                         handleServerAppError(dispatch, res.data);
//                     }
//                 })
//                 .catch((error) => {
//                     handleServerNetworkError(dispatch, error);
//                 });
//         };
