import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  "Token": null,
  "First Name": null,
  "Last Name": null,
  "Email": null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.userToken = action.payload;
    },
    addUser: (state, action) => {
      console.log(action.payload)
      state["First Name"] = action.payload.firstName;
      state["Last Name"] = action.payload.lastName;
      state["Email"] = action.payload.email;
    },
    deleteToken: (state, action) => {
      state.userToken = null;
    },
    isLoggedIn: (state, action) => {
      if (state.Token) {
        return true;
      } else {
        return false;
      }
    },
  },
});

export const { addToken, addUser, deleteToken, isLoggedIn } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state) => state.user;

export default userSlice.reducer;
