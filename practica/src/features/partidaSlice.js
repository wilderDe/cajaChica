import { createSlice } from "@reduxjs/toolkit";


export const partidaSlice = createSlice({
    name: 'partida',
    initialState:{
        partidas: []
    },
    reducers:{
        traerPartidas:(state, {payload})=>{
            state.partidas = payload
        }
    }
})

export const { traerPartidas } = partidaSlice.actions
export default partidaSlice.reducer