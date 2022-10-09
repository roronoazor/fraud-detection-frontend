import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authUser: {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      return {...state, authUser: action.payload}
    },
    logout: (state, action) => {
        return {...state, authUser: {}}
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer