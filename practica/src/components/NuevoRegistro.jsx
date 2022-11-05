import { useState } from "react"
import DatePicker, {registerLocale} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
registerLocale("es",es)

import edit from '../../assets/edit.png'


import './styles.css'
import cajaChicaApi from "../api/cajaChicaApi"
import Swal from "sweetalert2"

let registros
export const NuevoRegistro = () => {
    const [form, setForm] = useState({movimiento: '',fecha:'',factura:'',partida:'',descripcion:'',importe:'',tipoRetencion:'',beneficiario:'',observaciones:'',})
    
    const [bandera, setBandera] = useState(true)
    const handleFecha = (e)=>{
        setForm({...form,['fecha']:e})
    }

    const handleChangedInfo = ({target})=>{
      setForm({
        ...form,
        [target.name]:target.value
      })
    }

    const handleSubmitInfo = async(e)=>{
        e.preventDefault();
        console.log(form)
        await cajaChicaApi.post('/registro',form)
        setForm({movimiento: '',fecha:'',factura:'',partida:'',descripcion:'',importe:'',tipoRetencion:'',beneficiario:'',observaciones:'',})
        Swal.fire("Exito","Partida agregada","success")
    }

    const handleVerTabla = async(value) => {
        
        const {data} = await cajaChicaApi.get('/registro')
        registros = data
        registros.map(saldo => {
            const separados = saldo.fecha.split('T')
            saldo.fecha = separados[0]
        })
    
        setBandera(value)
    }

    const mostrarFormRegistro = () =>{
        return(
            <>
                <button className='btn-options' onClick={()=>handleVerTabla(false)}>Ver tabla de registros</button>
                <div className="contenedor">
                    <form onSubmit={handleSubmitInfo} >
                        <div className="informacion">
                            <div className="info-left">
                                <div className="caja_btn">
                                    <label htmlFor="" >Movimiento: </label>
                                    <input type="text" name='movimiento' className='btn-buscar' onChange={handleChangedInfo} value={form.movimiento} />
                                </div>

                                <div  className="caja_btn">
                                    <label htmlFor="">Fecha:</label>
                                    <DatePicker name="fecha" selected={form.fecha} onChange={handleFecha} locale="es"  className="btn-buscar btn-buscar-fecha" autoComplete="off" dateFormat="dd'/'MM'/'yyyy"/>

                                </div>
                            
                                <div  className="caja_btn">
                                    <label htmlFor="">Factura: </label>
                                    <input type="text" className='btn-buscar' name='factura' onChange={handleChangedInfo} value={form.factura} autoComplete="off"/>
                                </div>
                                
                                <div className="caja_btn">
                                    <label htmlFor="">Partida: </label>
                                    <input type="text" name='partida' className='btn-buscar'  onChange={handleChangedInfo} value={form.partida} autoComplete="off"/>
                                </div>
                                
                                <div className="caja_btn">
                                    <label htmlFor="">Descripcion: </label>
                                    <input type="text" name='descripcion' className='btn-buscar'  onChange={handleChangedInfo} value={form.descripcion} autoComplete="off"/>
                                </div>
                                
                                <div className="caja_btn">
                                    <label htmlFor="">Importe: </label>
                                    <input type="text" name='importe' className='btn-buscar'  onChange={handleChangedInfo} value={form.importe} autoComplete="off"/>
                                </div>
                                
                                <div className="caja_btn">
                                    <label htmlFor="">Tipo de retencion: </label>
                                    <input type="text" name='tipoRetencion' className='btn-buscar'  onChange={handleChangedInfo} value={form.tipoRetencion} autoComplete="off"/>
                                </div>
                                
                                <div className="caja_btn">
                                    <label htmlFor="">Beneficiario: </label>
                                    <input name="beneficiario" className='btn-buscar' onChange={handleChangedInfo} value={form.beneficiario} />
                                </div>
                                
                                <div className="caja_btn">
                                    <label htmlFor="">Observaciones: </label>
                                    <input type="text" name='observaciones' className='btn-buscar' onChange={handleChangedInfo} value={form.observaciones} autoComplete="off"/>
                                </div>
                                
                            </div>
                            
                        </div>
                        <button className='btn-options btn-info m-left-20'>Agregar</button>
                    </form>
                </div>
            </>
        )
    }
    const mostrarTablaRegistro = () => {
        return(
            <>
                <button className='btn-options' onClick={()=>handleVerTabla(true)}>Volver</button>
                <div className="contenedor">
                <table className="tablas">
                        <thead>
                            <tr>    
                                <td className="table-th">#</td>
                                <td className="table-th">movimiento</td>
                                <td className="table-th">fecha</td>
                                <td className="table-th">factura</td>
                                <td className="table-th">nro partida</td>
                                <td className="table-th">categoria</td>
                                <td className="table-th">descripcion</td>
                                <td className="table-th">importe</td>
                                <td className="table-th">tipo retencion</td>
                                <td className="table-th">retencion</td>
                                <td className="table-th">total importe</td>
                                <td className="table-th">saldo</td>
                                <td className="table-th">beneficiario</td>
                                <td className="table-th">observacion</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                registros.map(registro =>(
                                    <tr className="color" key={registro._id}>
                                        <td className="table-td">1</td>
                                        <td className="table-td">{registro.movimiento} </td>
                                        <td className="table-td">{registro.fecha} </td>
                                        <td className="table-td">{registro.factura} </td>
                                        <td className="table-td">{registro.partida.partida} </td>
                                        <td className="table-td">{registro.partida.categoria} </td>   
                                        <td className="table-td">{registro.descripcion} </td>   
                                        <td className="table-td">{registro.importe} </td>
                                        <td className="table-td">{registro.tipoRetencion} </td>
                                        <td className="table-td">{registro.retencion} </td>
                                        <td className="table-td">{registro.total_importe} </td>
                                        <td className="table-td">{registro.cod_saldo.saldo} </td>
                                        <td className="table-td">{registro.beneficiario} </td>   
                                        <td className="table-td">{registro.observaciones}</td>     
                                    </tr>
                                ))
                            }
                           
                          
                            
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
    return (
        <>
            {
                (bandera)? mostrarFormRegistro():mostrarTablaRegistro()
            }
           
        </>
    )
}
