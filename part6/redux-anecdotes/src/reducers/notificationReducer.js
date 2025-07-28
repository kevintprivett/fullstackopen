import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  },
})

export const { setNotification } = notificationSlice.actions

export const notify = ( notification, time ) => {
  return async dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
