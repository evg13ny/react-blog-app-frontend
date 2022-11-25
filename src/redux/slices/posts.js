import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts')
    return data
})

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },

    tags: {
        items: [],
        status: 'loading',
    },
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'loading'
            state.posts.items = []
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded'
            state.posts.items = action.payload
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.status = 'error'
            state.posts.items = '[]'
        },
    },
})

export const postsReducer = postsSlice.reducer