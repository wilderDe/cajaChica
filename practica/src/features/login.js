import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState:{
        login: false
    },
    reducers:{
        usuarioLogear:(state, {payload})=>{
                state.login=payload.value
        }
    }
})

export const {usuarioLogear} = loginSlice.actions

export default loginSlice.reducer