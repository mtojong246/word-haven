import { combineReducers } from "redux";
import { wordReducer } from "../slices/words";
import { loginReducer } from "../slices/login";

export const rootReducer = combineReducers({
    word: wordReducer,
    login: loginReducer,
})