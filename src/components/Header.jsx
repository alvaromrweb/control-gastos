import React from 'react'
import NuevoPrespupuesto from './NuevoPrespupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
  presupuesto, 
  setPresupuesto,
  showControlPage,
  setShowControlPage,
  gastos,
  resetApp
}) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>
        {showControlPage ? (
          <ControlPresupuesto
          presupuesto={presupuesto}
          gastos={gastos}
          resetApp={resetApp}
          />
        ) : (
          <NuevoPrespupuesto 
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setShowControlPage={setShowControlPage}
          />

        )}
    </header>
  )
}

export default Header