// src/stores/slices/passwordSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axios';

export const requestChangePassword = createAsyncThunk(
    'password/requestChangePassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('/web/password/request-otp', { email });
            return response;
        } catch (error) {
            // Xử lý lỗi từ server
            if (error.response) {
                // Server trả về lỗi với status code 4xx/5xx
                return rejectWithValue(error.response);
            } else if (error.request) {
                // Request được gửi nhưng không nhận được response
                return rejectWithValue({ message: 'Không nhận được phản hồi từ server' });
            } else {
                // Lỗi khi thiết lập request
                return rejectWithValue({ message: 'Email không tồn tại' });
            }
        }
    }
);

export const changePassword = createAsyncThunk(
    'password/changePassword',
    async ({ email, code, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('/web/password/change', {
                email,
                code,
                newPassword
            });
            return response;
        } catch (error) {
            return rejectWithValue(error || { message: 'Lỗi đổi mật khẩu' });
        }
    }
);

const passwordSlice = createSlice({
    name: 'password',
    initialState: {
        loading: false,
        error: null,
        message: ''
    },
    reducers: {
        clearPasswordState: (state) => {
            state.loading = false;
            state.error = null;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestChangePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(requestChangePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(requestChangePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearPasswordState } = passwordSlice.actions;
export default passwordSlice.reducer;
