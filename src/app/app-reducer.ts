//app-reducer.tsx
import { authAPI } from "api/todolist-api";
import { setIsLoggedIn } from "features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "utils/create-app-asynk";
import {handleServerAppError, handleServerNetworkError} from "utils/errorUtilit";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  initialized: false,
};

export const initializeAppTC = createAppAsyncThunk('app/initialized',async (arg, thunkAPI) => {
  try{
    let response = await authAPI.authMe()
    console.log(`answer is ${response.data.resultCode}`, 7)
    if(response.data.resultCode === 0){
      thunkAPI.dispatch(setIsLoggedIn({value: true}))
      return
    }
  } catch (error){
    handleServerNetworkError(error, thunkAPI.dispatch)
  }
})

export const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
  },

  extraReducers: builder => {
    builder.addCase(initializeAppTC.fulfilled, (state, action) => {
      state.initialized = true
    })
  }
});
export const { setAppStatus, setAppError } = slice.actions;
export const appReducer = slice.reducer;
export const appActions = slice.actions;


export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  initialized: boolean;
};


// export const initializeAppTC_ = (): AppThunk => (dispatch) => {
//   authAPI.authMe().then((res) => {
//     if (res.data.resultCode === 0) {
//       dispatch(setIsLoggedIn({ value: true }));
//     }
//     dispatch(setInitialized({ value: true }));
//   });
// };