import { configureStore } from '@reduxjs/toolkit'
import bloggerReducer from '../slices/blogSlice'

export const store = configureStore({
    reducer: {
        blogger: bloggerReducer
    },
})