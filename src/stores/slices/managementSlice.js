import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axios';

// Async thunks
export const fetchAccounts = createAsyncThunk(
    'management/fetchAccounts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get('/admin/accounts');
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchServices = createAsyncThunk(
    'management/fetchServices',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get('/admin/services');
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchCombos = createAsyncThunk(
    'management/fetchCombos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get('/admin/combos');
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createEmployee = createAsyncThunk(
    'management/createEmployee',
    async (employeeData, { rejectWithValue }) => {
        try {
            const response = await axiosClient.post('/admin/create', employeeData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const initialState = {
    accounts: [],
    services: [],
    combos: [],
    loading: false,
    error: null
};

const managementSlice = createSlice({
    name: 'management',
    initialState,
    reducers: {
        clearManagementError: (state) => {
            state.error = null;
        },
        resetManagementState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            // Accounts
            .addCase(fetchAccounts.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts = action.payload;
            })

            // Services
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })

            // Combos
            .addCase(fetchCombos.fulfilled, (state, action) => {
                state.loading = false;
                state.combos = action.payload;
            })

            // Create Employee
            .addCase(createEmployee.fulfilled, (state) => {
                state.loading = false;
            })

            // Common loading
            .addMatcher(
                (action) =>
                    action.type.endsWith('/pending') &&
                    ['management/fetchAccounts', 'management/fetchServices', 'management/fetchCombos', 'management/createEmployee'].some((type) =>
                        action.type.startsWith(type)
                    ),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            // Common error handling
            .addMatcher(
                (action) =>
                    action.type.endsWith('/rejected') &&
                    ['management/fetchAccounts', 'management/fetchServices', 'management/fetchCombos', 'management/createEmployee'].some((type) =>
                        action.type.startsWith(type)
                    ),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload || 'An error occurred';
                }
            );
    }
});

export const { clearManagementError, resetManagementState } = managementSlice.actions;
export default managementSlice.reducer;