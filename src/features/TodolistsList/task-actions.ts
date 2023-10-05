import {createAppAsyncThunk} from "utils/create-app-asynk";
import {setAppStatus} from "app/app-reducer";
import {todolistApi, UpdateTaskModelType} from "api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtilit";
import {changeTodolistEntityStatus} from "features/TodolistsList/todolistReducer";
import {UpdateDomainTaskModelType} from "features/TodolistsList/task-reducer";


export const fetchTasks = createAppAsyncThunk('tasks/fetchTask', async (todolistId: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
        let res = await todolistApi.getTasks(todolistId);
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {tasks: res.data.items, todolistId}
    } catch (error) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return  thunkAPI.rejectWithValue("Some Error")
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
            handleServerNetworkError(error, thunkAPI.dispatch)
            return  thunkAPI.rejectWithValue("Some Error")
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
            handleServerNetworkError(error, thunkAPI.dispatch)
            return  thunkAPI.rejectWithValue("Some Error")
        }
    })
export const updateTaskTC = createAppAsyncThunk('tasks/updateTask',
    async (arg:{todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType}, thunkAPI) => {
        const state = thunkAPI.getState().tasks[arg.todolistId].find((el)=> el.id === arg.taskId)
        if (!state) {
            return  thunkAPI.rejectWithValue('State is not found')
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
            handleServerNetworkError(error, thunkAPI.dispatch)
            return  thunkAPI.rejectWithValue("Some Error")
        }
    })
