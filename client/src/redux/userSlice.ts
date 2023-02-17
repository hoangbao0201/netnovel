import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/types";

interface CounterState {
    currentUser: UserType | null
    userLoading: boolean
    isAuthenticated: boolean
}

const initialState: CounterState = {
    currentUser: null,
    userLoading: false,
    isAuthenticated: false,
};

export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userHandle: (state, action) => {
            state.currentUser = action.payload
            state.userLoading = false
            state.isAuthenticated = true
        }
    },
});

export const { userHandle } = counterSlice.actions;

export default counterSlice.reducer;
