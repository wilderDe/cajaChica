import { useState } from "react"
import cajaChicaApi from "../api/cajaChicaApi"
import Swal from "sweetalert2"
import {  useSelector } from "react-redux"

export const Perfil = () => {
    const {usuario} = useSelector(state => state.usuario )
    const [form, setForm] = useState({
        ci:usuario.ci,
        nombre:usuario.nombre,
        ap_paterno: usuario.ap_paterno,
        ap_materno:usuario.ap_materno,
        direccion:usuario.direccion,
        telefono:usuario.telefono,
        usuario:usuario.usuario,
        password:usuario.password
    })
    const handleChangedInfo = ({target})=>{
      setForm({
        ...form,
        [target.name]:target.value
      })
    }

    const handleSubmitInfo = async(e)=>{
        e.preventDefault();
      
        try {
            console.log(usuario._id)
            await cajaChicaApi.put(`/usuario/${usuario._id}`, form)
            Swal.fire("Exito","Tus datos fueron actualizados","success")
    
        } catch (error) {
            console.log(error)
        }
        
    }
    return (
        <div className="contenedor">
            <form onSubmit={handleSubmitInfo} >
                <div className="informacion">
                    <div className="info-left">
                        <div className="caja_btn">
                            <label htmlFor="" >C.I.: </label>
                            <input type="text" name='ci' className='btn-buscar' onChange={handleChangedInfo} value={form.ci} />
                        </div>
                        <div  className="caja_btn">
                            <label htmlFor="">Nombre:</label>
                            <input type="text" className='btn-buscar' name='nombre' value={form.nombre}  onChange={handleChangedInfo} autoComplete="off"/>
                        </div>
                        <div  className="caja_btn">
                            <label htmlFor="">Apellido paterno: </label>
                            <input type="text" className='btn-buscar' name='ap_paterno' value={form.ap_paterno}  onChange={handleChangedInfo} autoComplete="off"/>
                        </div>
                        <div className="caja_btn">
                            <label htmlFor="">Apellido materno: </label>
                            <input type="text" name='ap_materno' className='btn-buscar'  onChange={handleChangedInfo} value={form.ap_materno}  autoComplete="off"/>
                        </div>
                        <div className="caja_btn">
                            <label htmlFor="">Direccion: </label>
                            <input type="text" name='direccion' className='btn-buscar'  onChange={handleChangedInfo} value={form.direccion}  autoComplete="off"/>
                        </div>
                        <div className="caja_btn">
                            <label htmlFor="">Telefono: </label>
                            <input type="text" name='telefono' className='btn-buscar'  onChange={handleChangedInfo} value={form.telefono}  autoComplete="off"/>
                        </div>
                       
                        <div className="caja_btn">
                            <label htmlFor="">Usuario: </label>
                            <input type="text" name='usuario' className='btn-buscar'  onChange={handleChangedInfo} value={form.usuario}  autoComplete="off"/>
                        </div>
                        <div className="caja_btn">
                            <label htmlFor="">Contraseña: </label>
                            <input type="text" name='password' className='btn-buscar'  onChange={handleChangedInfo} value={form.password}  autoComplete="off"/>
                        </div>
                    </div>
                    
                </div>
                <button className='btn-options btn-info m-left-20'>Agregar</button>
            </form>
        </div>
    )
}
