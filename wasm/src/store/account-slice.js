import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'account',
  initialState: { login: false, username: '' },
  reducers: {
    login(state, action) {
      state.login = true
      state.username = action.payload
    },
    logout(state) {
      state.login = false
    },
  },
})

export const accountActions = accountSlice.actions

export default accountSlice.reducer
