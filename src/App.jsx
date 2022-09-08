import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import IconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import { generarId } from './helpers'

function App() {

  const [presupuesto, setPresupuesto] = useState(localStorage.getItem('presupuesto') ?? 0)
  const [showControlPage, setShowControlPage] = useState(presupuesto > 0 ? true : false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? [])
  const [gastoEdit, setGastoEdit] = useState({})

  const [filterCategoria, setFilterCategoria] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if(Object.keys(gastoEdit).length > 0) {
      handleNuevoGasto()
    }
  }, [gastoEdit])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos))
  }, [gastos])

  useEffect(() => {
    if(filterCategoria) {
      const filtradosGastos = gastos.filter( oldGasto => oldGasto.categoria === filterCategoria)
      setGastosFiltrados(filtradosGastos)
      
    }
  }, [filterCategoria])
  

  const handleNuevoGasto = () => {
    setModal(true)
    console.log('Nuevo gasto')
    setTimeout(() => {
      setAnimarModal(true)
    }, 200);
  }

  const guardarGasto = gasto => {
    gasto.id = generarId()
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])
  }

  const eliminarGasto = (id) => {
    const gastosActualizado = gastos.filter( oldGasto => oldGasto.id !== id)
    setGastos(gastosActualizado)
  }

  const resetApp = () => {
    const confirmacion = confirm('¿Seguro que quieres resetear la aplicación?')
    if(confirmacion) {
      setPresupuesto(0)
      setGastos([])
      window.location.reload(false);

    }
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
      presupuesto={presupuesto}
      setPresupuesto={setPresupuesto}
      showControlPage={showControlPage}
      setShowControlPage={setShowControlPage}
      gastos={gastos}
      resetApp={resetApp}
      />
      {showControlPage && (
        <>
          <main>
            <Filtros 
              filterCategoria={filterCategoria}
              setFilterCategoria={setFilterCategoria}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEdit={setGastoEdit}
              eliminarGasto={eliminarGasto}
              filterCategoria={filterCategoria}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} onClick={handleNuevoGasto} />
          </div>
        </>
      )}

      {modal && (
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEdit={gastoEdit}
          gastos={gastos}
          setGastos={setGastos}
          setGastoEdit={setGastoEdit}
        />
      )}
      
    </div>
  )
}

export default App
