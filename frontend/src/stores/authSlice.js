import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:5003/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const signupUser = createAsyncThunk('auth/signupUser', async ({ email, username, password }, { rejectWithValue }) => {
    try {
        const response = await fetch('http://localhost:5003/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, status: 'idle', error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.username;
                state.token = action.payload.token;
                state.status = 'succeeded';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            })
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.user = action.payload.username;
                state.token = action.payload.token;
                state.status = 'succeeded';
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'failed';
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

