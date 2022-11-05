import { useState } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Login } from "../pages/Login"



export const Navigate = () => {
    const {login} = useSelector(state=>state.login)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login /> } />
                {
                    (login)
                    ?<Route path="/home" element={ <Home />  } />
                    : ""
                }
                <Route path="*" element={<Login /> } />
            </Routes>
        </BrowserRouter>
    )
}
