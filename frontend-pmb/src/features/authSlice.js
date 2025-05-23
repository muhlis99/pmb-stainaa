import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const LoginUser = createAsyncThunk("User/LoginUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post('v1/login/in', {
            email: user.email,
            password: user.password,
            status: "aktif"
        })
        return response.data
    } catch (error) {
        if (error.response.data.message) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        } else {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const RegistrasiUser = createAsyncThunk("user/RegistrasiUser", async (user, thunkAPI) => {
    try {
        const response = await axios.post('v1/registrasi/daftar', {
            nama: user.nama,
            email: user.email,
            conPass: user.konfirmPass,
            pass: user.password
        })
        return response.data
    } catch (error) {
        if (error.response.data.message) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        } else {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const KodeVerifikasi = createAsyncThunk("user/KodeVerifikasi", async (user, thunkAPI) => {
    try {
        const response = await axios.post(`v1/registrasi/verifikasi`, {
            kode: user.kodeVerify,
        })
        return response.data
    } catch (error) {
        const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
})

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
    try {
        const response = await axios.get('v1/login/me')
        return response.data
    } catch (error) {
        if (error.response) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
})

export const LogOut = createAsyncThunk("user/LogOut", async () => {
    await axios.delete('v1/login/out')
})

export const ResetPass = createAsyncThunk("user/ResetPass", async (user, thunkAPI) => {
    try {
        const response = await axios.put(`v1/login/resetPasswordByForgot/${user.id}`, {
            pass: user.passBaru,
            conPass: user.konfirmPass
        })
        return response.data
    } catch (error) {
        if (error.response.data.message) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        } else {
            const message = error.response.data.errors[0].msg
            return thunkAPI.rejectWithValue(message)
        }
    }
})


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(RegistrasiUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(RegistrasiUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(RegistrasiUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(KodeVerifikasi.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(KodeVerifikasi.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(KodeVerifikasi.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })

        builder.addCase(ResetPass.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(ResetPass.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
        })
        builder.addCase(ResetPass.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})



export const { reset } = authSlice.actions
export default authSlice.reducer