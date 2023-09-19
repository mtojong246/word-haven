import { WordState } from "../slices/words";
import { createSelector } from "reselect";
import { RootState } from "../store/store";

const selectWordReducer = (state: RootState): WordState => state.word;

export const selectWord = createSelector(
    [selectWordReducer],
    (wordSlice) => wordSlice.word
)