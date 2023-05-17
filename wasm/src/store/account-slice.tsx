import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AccountState = {
  login: boolean
  username: string
  failCount: number
  register: boolean
}

const initialState: AccountState = {
  login: false,
  username: '',
  failCount: 0,
  register: false,
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AccountState>) => {
      state.login = true
      state.username = action.payload.username
      state.failCount = 0
      state.register = true
    },
    logout: (state) => {
      state.login = false
      state.username = ''
    },
    failLogin: (state, action: PayloadAction<AccountState>) => {
      state.failCount = action.payload.failCount + 1
    },
    reLogin: (state, action: PayloadAction<AccountState>) => {
      state.failCount = 0
      action.payload.failCount = 0
    },
  },
})

export const updateAccount = accountSlice.actions

export default accountSlice.reducer
