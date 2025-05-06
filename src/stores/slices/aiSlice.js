import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axios';

// Async thunks cho AI Chat
export const sendChatMessage = createAsyncThunk(
    'ai/sendMessage',
    async (message, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('/web/chatbot/send', { message });

            return response;
        } catch (error) {
            console.log(error);

            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const aiSlice = createSlice({
    name: 'ai',
    initialState: {
        messages: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        clearMessages: (state) => {
            state.messages = [];
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendChatMessage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendChatMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages.push({
                    text: action.payload,
                    isBot: true
                });
            })
            .addCase(sendChatMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload?.message || 'Gửi tin nhắn thất bại';
            })
    }
});

export const {
    clearMessages, addMessage
} = aiSlice.actions;

export default aiSlice.reducer;