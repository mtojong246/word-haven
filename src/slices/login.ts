import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
    user: {
        email: string;
        username: string;
    } | null
}

const initialState: LoginState = {
    user: null
}

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null;
        }
    }
})

export const { login, logout } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;