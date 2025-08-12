import { createAsyncThunk, crreateSlice } from '@reduxjs/toolkit';
import axiosClient  from './utils/axiosClient';

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('user/register', userData);
            return response.data.user;
            
        } catch (error) {
            return rejectWithValue(error);
            
        }
    }

)
export const loginUser = createAsyncThunk(
    'auth/login',
    async (userData, {rejectWithValue}) =>{
        try {
            const response = await axios.post('user/login', userData);
            return response.data.user;
            
        } catch (error) {
            return rejectWithValue(error);
            
        }
        
    }

)
