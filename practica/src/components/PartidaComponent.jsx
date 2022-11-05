import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import cajaChicaApi from "../api/cajaChicaApi"
import { traerPartidas } from "../features/partidaSlice"




export const PartidaComponent = () => {
    
    const {partidas } = useSelector(state => state.partida)
    const dispatch = useDispatch()
    const [cargando, setCargando] = useState(true)
    const [formPar, setFormPar] = useState({})

    const handleChangedInfo = ({target})=>{
        setFormPar({
          ...formPar,
          [target.name]:target.value
        })
      }
    const handleSubmitInfo = async (e)=>{
        e.preventDefault();
        const {data} = await cajaChicaApi.post('/partida',formPar)
        Swal.fire("Exito","Partida agregada","success")
        setCargando(true)
    }

    const CargaPartida = async()=>{
        const {data} = await cajaChicaApi.get('/partida');
        dispatch(traerPartidas(data))
        setCargando(false)
 
    }

    if(cargando){
        CargaPartida()
        return(<h1>Cargando</h1>)
    }
    let con=1
    return (
        <div className="contenedor">
             <form onSubmit={handleSubmitInfo} >
                <div className="informacion">
                    <div className="info-left">
                        <div className="caja_btn">
                            <label htmlFor="" >Nro Partida: </label>
                            <input autoComplete="off" type="text" name='partida' className='btn-buscar' onChange={handleChangedInfo} />
                        </div> 
                        <div className="caja_btn">
                            <label htmlFor="" >Categoria: </label>
                            <input autoComplete="off" type="text" name='categoria' className='btn-buscar' onChange={handleChangedInfo} />
                        </div> 
                        <button className='btn-options btn-info m-left-20'>Agregar</button>     
                    </div>    
                </div>
            </form>
            <table className="tablas">
                <thead>
            
                    <tr>    
                        <td className="table-th">#</td>
                        <td className="table-th">partida</td>
                        <td className="table-th">categoria</td>
                       
                    </tr>
                </thead>
                <tbody>
                    
                {partidas.map(partida => (
                    <tr key={partida._id} className="color">
                        <td className="table-td">{con++} </td>
                        <td className="table-td">{partida.partida} </td>
                        <td className="table-td">{partida.categoria} </td>
                    </tr>      
                ))}     
                      
                </tbody>
            </table>
        </div>
    )
}
