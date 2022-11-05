import { useState } from "react"
import cajaChicaApi from "../../../api/cajaChicaApi"


let saldos
export const Saldo = () => {

    const [carga, setCarga] = useState(true)

    const cargaSaldos =  async() => {
        const {data} = await cajaChicaApi.get('/saldo')
        saldos = data
        saldos.map(saldo => {
            const separados = saldo.fecha.split('T')
            saldo.fecha = separados[0]
        })
        console.log(saldos)
        setCarga(false)
    }
    if(carga){
        cargaSaldos()
        return(<h1>cargando...</h1>)
    }

    return(
        <>
            <div className="contenedor">
            <table className="tablas">
                    <thead>
                        <tr>    
                            <td className="table-th">#</td>
                            <td className="table-th">saldo</td>
                            <td className="table-th">fecha</td>
                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            saldos.map(saldo => (
                                <tr key={saldo._id} className="color">
                                    <td className="table-td">1</td>
                                    <td className="table-td">{saldo.saldo} </td>
                                    <td className="table-td">{saldo.fecha} </td>  
                            </tr>
                            ))
                        }
                       
                        
                    </tbody>
                </table>
            </div>
        </>
    )
}
