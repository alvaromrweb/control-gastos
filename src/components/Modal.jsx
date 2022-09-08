import { useState, useEffect } from 'react'
import CerrarModalImg from '../assets/img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEdit,
    gastos,
    setGastos,
    setGastoEdit
}) => {
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')

    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        if(Object.keys(gastoEdit).length > 0) {
            setNombre(gastoEdit.nombre)
            setCantidad(gastoEdit.cantidad)
            setCategoria(gastoEdit.categoria)
        }
    }, [gastoEdit])
    

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEdit({})
        setTimeout(() => {
            
            setModal(false)
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setMensaje('')
        if([nombre, cantidad, categoria].includes('')) {
            setMensaje("Todos los campos son obligatorios")
            return
        }
        
        if(Object.keys(gastoEdit).length > 0) {
            const objGasto = {
                nombre: nombre,
                cantidad: cantidad,
                categoria: categoria,
                id: gastoEdit.id,
                fecha: Date.now()
            }
            const gastosUpdated = gastos.map((oldGasto) => oldGasto.id === gastoEdit.id ? objGasto : oldGasto)
            setGastos(gastosUpdated)
            setGastoEdit({})
        } else {
            guardarGasto({nombre, cantidad, categoria})

        }
        ocultarModal()
    }

    return (
        <div className="modal">
            <div className="cerrar-modal cursor-pointer">
                <img src={CerrarModalImg} onClick={ocultarModal} />
            </div>

            <form className={`formulario ${animarModal ? "animar" : ""}`} onSubmit={handleSubmit}>
                <legend>{gastoEdit.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>

                <div className='campo'>
                    <label htmlFor='nombre'>Nombre gasto</label>
                    <input type='text' id='nombre' placeholder='Añade el nombre del gasto' value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>
                    <input type='number' id='cantidad' placeholder='Añade la cantidad del gasto' value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))} onFocus={(e) => e.target.select()} />
                </div>
                <div className='campo'>
                    <label htmlFor='categoria'>Categoría</label>
                    <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">-- Selecciona --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                        <option value="varios">Gastos varios</option>
                    </select>
                </div>
                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
                <input type="submit" value={gastoEdit.nombre ? 'Guardar cambios' : 'Añadir gasto'} />
            </form>

        </div>
    )
}

export default Modal