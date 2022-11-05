import { useSelector } from 'react-redux'
import './home.css'
import { Secciones } from './Secciones';


export const Cuerpo= () => {
    const { opcion } = useSelector(state => state.menu);
    const mensaje = [
        'Registro de entradas y salidas de la caja chica',
        'Reportes segun a la solicitud del usuario',
        'Adminitracion del personal de la empresa',
        'Administracion de las partidas de la empresa',
        'Administracion del saldo de las empresa',
    ]
    return (
        <main className='main'>
            <div className="header">
                <div className="header-left">
                    <h2 className='header-title'>Bienvenido al servicio de Caja Chica</h2>
                    <p>{mensaje[opcion-1]}</p>
                </div>
                <div className="header-rigth">
                </div>

            </div>
            <Secciones />
        </main>
    )
}
