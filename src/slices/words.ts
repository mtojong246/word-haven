import { createSlice } from "@reduxjs/toolkit";

export interface WordState {
    word: {
        meanings: [],
        phonetic: {},
        origin: [],
    },
}

const initialState: WordState = {
    word: {
        meanings: [],
        phonetic: {},
        origin: [],
    }
}

const wordSlice = createSlice({
    name: 'wordSlice',
    initialState,
    reducers: {
        setWord: (state, action) => {
            state.word = action.payload
        }
    }
})

export const { setWord } = wordSlice.actions;

export const wordReducer = wordSlice.reducer;