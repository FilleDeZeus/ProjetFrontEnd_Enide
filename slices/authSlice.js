import { createSlice } from '@reduxjs/toolkit';

//état initial
const initialState = {
  user: null,
};

export const userAdapter = (firebaseUser) => {
  // retourne null
  if (!firebaseUser) return null;

  // Sinon, retourne  objet 
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    firstName: firebaseUser.displayName.split(' ')[0],
    lastName: firebaseUser.displayName.split(' ')[1],
  };
};

// Creation  slice  
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