import { configureStore } from '@reduxjs/toolkit'
import accountSlice from './account-slice'
import idSlice from './id-slice'

const store = configureStore({
  reducer: { id: idSlice, account: accountSlice },
})

export default store
