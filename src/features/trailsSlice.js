import { createSlice } from '@reduxjs/toolkit';
import blueMountain from '../assets/mapData/blue-mountain.json'

const buildInitialState = (name) => {
    let mountain

    if (name === "Blue Mountain") {
        mountain = blueMountain
    }

    const initialState = {
        name: mountain.name,
        trails: {}
    }

    for (const [key, value] of Object.entries(mountain.trails)) {
        // console.log(`${key}: ${value}`);
        initialState.trails[key] = {
            name: value.name,
            runCounter: 0,
            difficulty: value.difficulty
        }
    }

    return initialState
}

const initialState = buildInitialState("Blue Mountain");

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
