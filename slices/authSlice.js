import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};
export const userAdapter = (firebaseUser) => {
    if (!firebaseUser) return null;
  
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
    };
  };
  
  export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user = userAdapter(action.payload);
      },
  },
});

export const { setUser } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export default authSlice.reducer;