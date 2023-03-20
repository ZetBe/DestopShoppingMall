import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'account',
  initialState: { login: false },
  reducers: {
    login(state) {
      state.login = true
    },
    logout(state) {
      state.login = false
    },
  },
})

export const accountActions = accountSlice.actions

export default accountSlice.reducer
