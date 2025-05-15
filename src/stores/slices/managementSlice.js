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

export const updateEmployee = createAsyncThunk(
    'management/updateEmployee',
    async ({ id, employeeData }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.put(`/admin/updated/${id}`, employeeData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const changeBlock = createAsyncThunk(
    'management/changeBlock',
    async ({ id, isBlocked }, { rejectWithValue }) => {
        try {
            const response = await axiosClient.put(`/admin/change-block/${id}`, null, {
                params: { isBlocked }
            });
            return { id, isBlocked };
        } catch (error) {
            return rejectWithValue(error.message);
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
        resetManagementState: () => initialState,
        updateEmployeeLocally: (state, action) => {
            const updatedEmployee = action.payload;
            state.accounts = state.accounts.map(account =>
                account.id === updatedEmployee.id ? updatedEmployee : account
            );
        }
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

            // Update Employee
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
            })

            // Change Block
            .addCase(changeBlock.fulfilled, (state, action) => {
                const { id, isBlocked } = action.payload;
                const accountIndex = state.accounts.findIndex(account => account.id === id);
                if (accountIndex !== -1) {
                    state.accounts[accountIndex].isBlocked = isBlocked;
                }
                state.loading = false;
            })



            // Common loading
            .addMatcher(
                (action) =>
                    action.type.endsWith('/pending') &&
                    [
                        'management/fetchAccounts',
                        'management/fetchServices',
                        'management/fetchCombos',
                        'management/createEmployee',
                        'management/updateEmployee',
                        'management/changeBlock'
                    ].some((type) => action.type.startsWith(type)),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addMatcher(
                (action) =>
                    action.type.endsWith('/rejected') &&
                    [
                        'management/fetchAccounts',
                        'management/fetchServices',
                        'management/fetchCombos',
                        'management/createEmployee',
                        'management/updateEmployee',
                        'management/changeBlock'
                    ].some((type) => action.type.startsWith(type)),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    }
});

export const { clearManagementError, resetManagementState } = managementSlice.actions;
export default managementSlice.reducer;