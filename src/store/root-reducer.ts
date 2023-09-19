import { combineReducers } from "redux";
import { wordReducer } from "../slices/words";

export const rootReducer = combineReducers({
    word: wordReducer,
})