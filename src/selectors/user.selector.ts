import { createSelector } from "reselect";
import { LoginState } from "../slices/login";
import { RootState } from "../store/store";

const selectLoginReducer = (state: RootState): LoginState => state.login;

export const selectUser = createSelector(
    [selectLoginReducer],
    (loginSlice) => loginSlice.user
)