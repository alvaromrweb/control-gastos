import { useState, useEffect } from "react"
const Filtros = ({filterCategoria, setFilterCategoria}) => {

  return (
    <div className="filtros sombra contenedor">
        <form>
            <div className="campo">
                <label>Filtrar gastos</label>
                <select id="categoria" value={filterCategoria} onChange={(e) => setFilterCategoria(e.target.value)}>
                    <option value="">-- Todas las categorías --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                    <option value="varios">Gastos varios</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros