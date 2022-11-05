
import { useState } from 'react'
import cajaChicaApi from '../api/cajaChicaApi'
import { FormUsuario } from './FormUsuario'
import './styles.css'
import dele from '../../assets/delete.png'
import Swal from 'sweetalert2'
let encontrados;

export const PersonalComponent = () => {
    const [busqueda, setBusqueda] = useState(true)
    const [nuevo, setNuevo] = useState(false)
    const [tabla, setTabla] = useState(false)

    const [form, setForm] = useState({
        busqueda:"",
    })
    const handleOption = (value) => {
        switch (value) {
            case 1:setBusqueda(true);setNuevo(false);setTabla(false);return
            case 2:setBusqueda(false);setNuevo(true);setTabla(false);return
            case 3:setBusqueda(false);setNuevo(false);setTabla(false);return
        }
    }
    const handleChangedInfo = ({target})=>{
        setForm({
          ...busqueda,
          [target.name]:target.value
        })
      }

    const handleSubmitInfo = async(e)=>{
        
        setTabla(false)
        e.preventDefault();
        const {data} = await cajaChicaApi.get(`/usuario/${form.busqueda}`)
        console.log(data)
        encontrados = data
        encontrados.map(usuario =>{
            const separados = usuario.fecha_ingreso.split('T')
            usuario.fecha_ingreso = separados[0]
        })
        setTabla(true)
    }

    const handleEliminar = async(id) => {
        const {data} = await cajaChicaApi.put(`/usuario/${id}`, {estado:false})
        Swal.fire("Eliminado","Usuario eliminado","success")
        setTabla(false)
        setForm({
            busqueda:''
        })
    }

    const tablaUsuarios = () =>{
        let con=1;
        return(
            <div className='contenedor'>  
            <table className="tablas">
                <thead>
            
                    <tr>    
                        <td className="table-th">#</td>
                        <td className="table-th">C.I.</td> 
                        <td className="table-th">nombre</td>
                        <td className="table-th">paterno</td>
                        <td className="table-th">materno</td>
                        <td className="table-th">direccion</td>
                        <td className="table-th">fecha ingreso</td>
                        <td className="table-th">telefono</td>
                        <td className="table-th">eliminar</td>
                    </tr>
                </thead>
                <tbody>
                {
                    encontrados.map(usuario => (
                        <tr key={usuario._id} className="color">
                            <td className="table-td">{con++} </td>
                            <td className="table-td">{usuario.ci} </td>
                            <td className="table-td">{usuario.nombre} </td>
                            <td className="table-td">{usuario.ap_paterno} </td>
                            <td className="table-td">{usuario.ap_materno} </td>
                            <td className="table-td">{usuario.direccion} </td>
                            <td className="table-td">{usuario.fecha_ingreso}</td>
                            <td className="table-td">{usuario.telefono} </td>  
                            <td className="table-td" onClick={()=>handleEliminar(usuario._id)} ><img src={dele} className='delete' /></td>                        
                        </tr>   
                    ))
                }     
                </tbody>
            </table>
            </div>
        )
    }
    const busquedaUsuario = () => {
        return (
            <>
                <button className='btn-options' onClick={()=>handleOption(2)}  >Agregar un nuevo usuario</button>
                <div className="contenedor">
                    <form onSubmit={handleSubmitInfo} >
                        <div className="informacion">
                            <div className="info-left">
                                <div className="caja_btn">
                                    <label htmlFor="" >Buscar personal: </label>
                                    <input type="text" name='busqueda' className='btn-buscar' onChange={handleChangedInfo} />
                                </div> 
                                <button className='btn-options btn-info m-left-20'>Buscar</button>     
                            </div>
                            
                        </div>
                    </form>
                </div>
                {
                    (tabla)?tablaUsuarios():""
                }
              
            </>
        )
    }
    const nuevoUsuario = () =>{
        return(
            <>
                <button className='btn-options' onClick={()=>handleOption(1)} >Volver</button>
                <div className="contenedor">
                    <FormUsuario />
                </div>
            </>
        )
    }
    const editarUsuario = () =>{
        return(
            <>
                <button className='btn-options' onClick={()=>handleOption(1)} >Volver</button>
                <h1>Editar Usuario</h1>
            </>
        )
    }
    
    return (
        <>
            {
                (busqueda)? busquedaUsuario() 
                :(nuevo)? nuevoUsuario()
                :(editar)? editarUsuario():"" 
            }      
        </>
    )
}
