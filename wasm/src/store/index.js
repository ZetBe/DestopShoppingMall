import { configureStore } from '@reduxjs/toolkit'
import idSlice from './id-slice'

const store = configureStore({
  reducer: { id: idSlice },
})

export default store
