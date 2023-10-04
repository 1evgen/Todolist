import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppRootStateType} from "app/store";
import {ResponseType} from 'api/todolist-api'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatch
    rejectValue: ResponseType | null | string
}>()