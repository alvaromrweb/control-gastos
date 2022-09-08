import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import { formatearFecha } from "../helpers"

import IconoAhorro from '../assets/img/icono_ahorro.svg'
import IconoCasa from '../assets/img/icono_casa.svg'
import IconoComida from '../assets/img/icono_comida.svg'
import IconoGastos from '../assets/img/icono_gastos.svg'
import IconoOcio from '../assets/img/icono_ocio.svg'
import IconoSalud from '../assets/img/icono_salud.svg'
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'


const Gasto = ({gasto, setGastoEdit, eliminarGasto, filterCategoria}) => {
    
    const iconos = {
        ahorro: IconoAhorro,
        comida: IconoComida,
        casa: IconoCasa,
        ocio: IconoOcio,
        salud: IconoSalud,
        suscripciones: IconoSuscripciones,
        varios: IconoGastos,
    }


    const handleEliminarGasto = (e) => {
        // const respuesta = confirm(`¿Seguro que quieres eliminar el gasto ${gasto.nombre}?`)
        // if(respuesta) {
            eliminarGasto(gasto.id)
        // }
    }

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEdit(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={handleEliminarGasto} destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

  return (
    <div className={filterCategoria && filterCategoria !== gasto.categoria ? 'd-none' : ''}>
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="gasto sombra">
                    <div className="contenido-gasto">
                        <img src={iconos[gasto.categoria]} alt='Icono gasto' />
                        <div className="descripcion-gasto">
                            <p className="categoria">{gasto.categoria}</p>
                            <p className="nombre-gasto">{gasto.nombre}</p>
                            <p className="fecha-gasto">Agregado el: <span>{formatearFecha(gasto.fecha)}</span></p>
                        </div>
                    </div>
                    <p className="cantidad-gasto">{gasto.cantidad} €</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    </div>
  )
}

export default Gasto