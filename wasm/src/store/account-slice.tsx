import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'account',
  initialState: { login: false, username: '', failCount: 0, register: false },
  reducers: {
    login(state, action) {
      state.login = true
      state.username = action.payload
      state.failCount = 0
      state.register = true
    },
    logout(state) {
      state.login = false
      state.username = ''
    },
    failLogin(state) {
      state.failCount++
    },
    reLogin(state) {
      state.failCount = 0
    },
  },
})

export const accountActions = accountSlice.actions

export default accountSlice.reducer
