import { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPrespupuesto = ({presupuesto, setPresupuesto, setShowControlPage}) => {


  const [mensaje, setMensaje] = useState('')

  const validatePresupuesto = (e) => {

    setMensaje('')
    if(isNaN(e.target.value) || Number(e.target.value) <= 0) {
      
      setMensaje("Presupuesto no válido")
    } 
    setPresupuesto(Number(e.target.value))
  }

  const handlePresupuesto = (e) => {
    e.preventDefault()
    
    if(isNaN(presupuesto) || Number(presupuesto) <= 0) {
      setShowControlPage(false)
      return
    } 
    setShowControlPage(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label>Definir presupuesto</label>
                <input 
                  className='nuevo-presupuesto' 
                  type="number" 
                  placeholder="Añade tu presupuesto" 
                  value={presupuesto} 
                  onChange={validatePresupuesto} 
                  onFocus={(e) => e.target.select()} 
                />
                <input type="submit" value="Añadir" />
            </div>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>

    </div>
  )
}

export default NuevoPrespupuesto