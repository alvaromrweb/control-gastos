import Gasto from "./Gasto"


const ListadoGastos = ({gastos, setGastoEdit, eliminarGasto, filterCategoria, gastosFiltrados}) => {
  return (
    <div className="listado-gastos contenedor">
        <h2>{(filterCategoria && gastosFiltrados.length <= 0) || gastos.length <= 0 ? 'No hay gastos aún' : 'Gastos'}</h2>
        
        {gastos.map( gasto => (
            <Gasto 
                key={gasto.id}
                gasto={gasto}
                setGastoEdit={setGastoEdit}
                eliminarGasto={eliminarGasto}
                filterCategoria={filterCategoria}
            />
        ))}
    </div>
  )
}

export default ListadoGastos