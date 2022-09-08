import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({presupuesto, gastos, resetApp}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const porcentajeGastado = (totalGastado * 100 / presupuesto).toFixed(2)
        setGastado(totalGastado)
        setDisponible(presupuesto - totalGastado)
        setPorcentaje(porcentajeGastado)
    }, [gastos])
    

    const formatearEuros = (cantidad) => {
        return cantidad.toLocaleString('es-ES', {style:'currency', currency:'EUR'})
    }

    

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
            value={porcentaje} 
            text={`${porcentaje}% Gastado`} 
            styles={buildStyles({
                pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                trailColor: '#f5f5f5'
            })} 
            />
        </div>
        <div className="contenido-presupuesto">
            
                <button className="reset-app" type="button" onClick={resetApp}>Resetear app</button>
            
            <p>
                <span>Presupuesto: </span> {formatearEuros(presupuesto)}
            </p>
            <p className={disponible < 0 ? 'negativo' : ''}>
                <span>Disponible: </span> {formatearEuros(disponible)} 
            </p>
            <p>
                <span>Gastado: </span> {formatearEuros(gastado)} 
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto