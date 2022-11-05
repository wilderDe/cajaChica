import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { cambiarMenu } from "../../features/menuSlice"
import { usuarioLogear } from "../../features/login"
import './home.css'
import img from '../../../assets/img1.png'
export const AsideMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {opcion} = useSelector(state => state.menu )
    const {usuario} = useSelector(state => state.usuario )
  
   
    const press = (bandera) => {
        dispatch(cambiarMenu(bandera))
    } 
    const handleClick= () =>{
      
        dispatch(usuarioLogear({value:false}))
        navigate("/");
    }
    const handlePerfil = () => {
        dispatch(cambiarMenu(6))
    }
    console.log(usuario)
    return (
        <div className="aside">
            <div className="opciones">
                <p
                    className={`${opcion===1 ?'btn active':'btn' }` }
                    onClick={() => press(1)} 
                >Registro de gastos</p>
                <p 
                    className={`${opcion===2 ?'btn active':'btn' }` }
                    onClick={() => press(2)}
                >Reportes</p>
                <p
                    className={`${opcion===3 ?'btn active':'btn' }` }
                    onClick={() => press(3)}
                >Personal</p>
                <p
                    className={`${opcion===4 ?'btn active':'btn' }` }
                    onClick={() => press(4)}
                >Partidas</p>
                <p
                    className={`${opcion===5 ?'btn active':'btn' }` }
                    onClick={() => press(5)}
                >Saldo</p>
            </div>
            <div className="perfil">
                <div className="img" onClick={handlePerfil}><img src={img} alt="" /> </div>
                <p>{usuario.nombre} {usuario.ap_paterno} </p>
                <button className="btn-options" onClick={handleClick}>cerrar sesion</button>
            </div>
            
        </div>
    )
}
