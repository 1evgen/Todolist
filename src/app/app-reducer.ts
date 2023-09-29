//app-reducer.tsx
import { authAPI } from "api/todolist-api";
import { AppThunk } from "./store";
import { setIsLoggedIn } from "features/Login/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "utils/create-app-asynk";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  initialized: false,
};

export const initializeAppTC = createAppAsyncThunk('app/initialized',async (arg, thunkAPI) => {
  let response = await authAPI.authMe()
  thunkAPI.dispatch(setIsLoggedIn({value: true}))
  return
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
    // setInitialized: (state, action: PayloadAction<{ value: boolean }>) => {
    //   state.initialized = action.payload.value;
    // },
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



// export const initializeAppTC_ = (): AppThunk => (dispatch) => {
//   authAPI.authMe().then((res) => {
//     if (res.data.resultCode === 0) {
//       dispatch(setIsLoggedIn({ value: true }));
//     }
//     dispatch(setInitialized({ value: true }));
//   });
// };

export type CommonFeatureForAppActionsType =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppError>

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  initialized: boolean;
};
