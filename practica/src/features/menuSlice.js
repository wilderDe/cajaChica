import { createSlice } from "@reduxjs/toolkit";


export const menuSlice = createSlice({
    name:'menu',
    initialState:{
        opcion:1
    },
    reducers:{
        cambiarMenu:(state, {payload})=>{
            state.opcion = payload
        }
    }
})

export const {cambiarMenu} = menuSlice.actions
export default menuSlice.reducer