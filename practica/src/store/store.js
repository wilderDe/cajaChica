import { configureStore } from "@reduxjs/toolkit";
import  loginSlice from "../features/login";
import menuSlice from "../features/menuSlice";
import partidaSlice from "../features/partidaSlice";
import usuarioSlice from "../features/usuarioSlice";


export const store = configureStore({
    reducer:{
        login: loginSlice,
        menu: menuSlice,
        partida: partidaSlice,
        usuario: usuarioSlice
    }
})