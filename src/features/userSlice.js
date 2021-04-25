import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
  name: "user",
  initialState:{
    user: null,
    anime:[]
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    animehandle: (state,action) =>{
      state.anime = action.payload;
    }
  },  
});

export const { login,logout,animehandle } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const selectAnime = (state) => state.anime;

export default userSlice.reducer;
