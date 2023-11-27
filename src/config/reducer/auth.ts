import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchAuth } from '../../services/auth';
import reduxStorage from '../storage';
import { useDispatch } from 'react-redux';


const initialState = {
    loading: false,
    authenticated: false,
    data: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    extraReducers(builder) {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.data = action.payload
                state.authenticated = true
                state.loading = false
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.loading = false
                console.log(state, action);
                
            })
    },
    reducers: {
        // to change data state reducer / initialState
        setToken(state, action) {
            state.data = action.payload
            
        },
        getToken(state, action) {
            state.data = action.payload?.token     
        },
        logout(state, action) {
            state.data = []
            state.loading = false
            state.authenticated = false
        }
    }
})

export const {setToken, logout, getToken} = authSlice.actions

export default authSlice.reducer;