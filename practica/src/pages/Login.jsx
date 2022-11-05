import { useDispatch, useSelector } from "react-redux"
import { usuarioLogear } from "../features/login"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

import "./login.css";
import cajaChicaApi from "../api/cajaChicaApi";
import Swal from "sweetalert2";
import { usuarioLog } from "../features/usuarioSlice";

export const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [form, setForm] = useState({usuario:'', password:''})


    const handleChanged =({target})=>{
        setForm({
            ...form,
            [target.name]: target.value
        })
    }
    
    const handleIngresar= async(e) =>{
        e.preventDefault();

        const {data} = await cajaChicaApi.get(`/usuario/${form.usuario}/${form.password} `)
        
        if(data.value){
            console.log(data.user)
            dispatch(usuarioLog(data.user[0]))
            dispatch(usuarioLogear({value:true}))
            navigate("/home");
        }else{
            Swal.fire("Error","Datos incorrectos","error")
        }
        setForm({
            usuario:'',
            password:''
        })
    }

    return (
        <div className="fondo_log">
             <form className='form_log' onSubmit={handleIngresar}>
                <h1>Bienvenido</h1>
                <div className="form_inputs">
                <label htmlFor="">Usuario</label>
                <input 
                    type="text" 
                    className="log_inputs"
                    name="usuario" 
                    onChange={handleChanged}
                    value={form.usuario}
                    autoComplete="off"
                />
                <label htmlFor="">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    className="log_inputs"
                    onChange={handleChanged}
                    value={form.password}
                    autoComplete="off"
                />
                </div>
                <div className="btn-log-div">
                    <button className='btn-log'>Ingresar</button>
                </div>
             
            </form>  
  
        </div>
    )
}
