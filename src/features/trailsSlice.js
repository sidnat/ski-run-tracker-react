import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    "name": "Blue Mountain",
    "trails": {
        "Rinus Run": {
            "runCounter": 0
        },
        "Crooked Oak": {
            "runCounter": 0
        },
        "Apple Bowl": {
            "runCounter": 0
        }
    }
};

export const trailsSlice = createSlice({
    name: 'trails',
    initialState,
    reducers: {
        increment: (state, action) => {

            state.trails[action.payload].runCounter += 1;
        },
        updateRunCount: (state, action) => {
            state.trails[action.payload.name].runCounter = action.payload.value;
        }
    },
});

export const { increment, updateRunCount } = trailsSlice.actions;

export const selectTrails = (state) => state.trails;

export default trailsSlice.reducer;
