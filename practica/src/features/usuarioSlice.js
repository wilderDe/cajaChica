import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
    name:'usuario',
    initialState:{
        usuario:{}
    },
    reducers:{
        usuarioLog:(state, {payload})=>{
            console.log(payload)
            state.usuario = payload
        }
    }
})

export const {usuarioLog} = usuarioSlice.actions
export default usuarioSlice.reducer