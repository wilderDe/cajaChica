import { useState } from "react"
import DatePicker, {registerLocale} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import cajaChicaApi from "../api/cajaChicaApi"
import Swal from "sweetalert2"
registerLocale("es",es)


export const FormUsuario = () => {
    const [form, setForm] = useState({
        ci:'',
        nombre:"",
        ap_paterno:"",
        ap_materno:"",
        direccion:"",
        telefono:"",
        fecha_ingreso: "",
        rol:""
    })
    
 
    const handleFecha = (e)=>{
        setForm({...form,['fecha_ingreso']:e})
    }

    const handleChangedInfo = ({target})=>{
      setForm({
        ...form,
        [target.name]:target.value
      })
    }

    const handleSubmitInfo = async(e)=>{
        e.preventDefault();
        const {data} = await cajaChicaApi.post('/usuario',form)
        Swal.fire("Exito","Usuario nuevo agregado","success")
   
        setForm({
            ci:'',
            nombre:"",
            ap_paterno:"",
            ap_materno:"",
            direccion:"",
            telefono:"",
            fecha_ingreso: "",
            rol:""
        })
        
    }

   
    return (
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
                    <label htmlFor="">Fecha: </label>
                    <DatePicker name="fecha_ingreso" selected={form.fecha_ingreso} onChange={handleFecha} locale="es" className="btn-buscar btn-buscar-fecha" autoComplete="off" dateFormat="dd'/'MM'/'yyyy"/>

                </div>
                <div className="caja_btn">
                    <label htmlFor="">Rol: </label>
                    <input type="text" name='rol' className='btn-buscar'  onChange={handleChangedInfo} value={form.rol}  autoComplete="off"/>
                </div>
            </div>
            
        </div>
        <button className='btn-options btn-info m-left-20'>Agregar</button>
    </form>
    )
}
