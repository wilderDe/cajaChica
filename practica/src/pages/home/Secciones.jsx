import { useSelector } from "react-redux"
import { Partidas } from "./secciones/Partidas";
import { Personal } from "./secciones/Personal";
import { Registro } from "./secciones/Registro";
import { Reportes } from "./secciones/Reportes";
import { Saldo } from "./secciones/Saldo";
import './home.css'
import { Perfil } from "../../components/Perfil";
export const Secciones = () => {
    const { opcion } = useSelector(state => state.menu);

    const segunOpcion = () => {
        switch (opcion) {
            case 1: return( <Registro />)
            case 2: return( <Reportes />)
            case 3: return( <Personal />)
            case 4: return( <Partidas />)
            case 5: return( <Saldo />)
            case 6: return( <Perfil />)
        }
    }

    return (
        <div className="secciones">
            {segunOpcion()}
        </div>
    )
}
