import { createSlice } from '@reduxjs/toolkit'

const idSlice = createSlice({
  name: 'id',
  initialState: { likes: 0, hates: 0 },
  reducers: {
    addLike(state) {
      state.likes++
    },
    addHate(state) {
      state.hates++
    },
  },
})

export const idActions = idSlice.actions

export default idSlice.reducer
