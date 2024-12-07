import React from 'react'
import { useState } from 'react'

function ListaTareas(){
    
    const localStorageTareas = localStorage.getItem('tareas')
    let parset;
    
    
    if(!localStorageTareas){
        localStorage.setItem('tareas', JSON.stringify([]))
        parset = []
    }else{
        parset = JSON.parse(localStorageTareas)
    }
        
    const [nuevaTarea, setNuevaTarea] = useState('')
    const [tareas, setTareas] = useState(parset)
    const [filtro, setFiltro] = useState('todas') // puede ser todad pendientes o completadas


    const saveTareas = (newTareas) => {
        localStorage.setItem('tareas', JSON.stringify(newTareas))
        setTareas(newTareas)
    }

    
    const agregarTarea = () => {
        if (nuevaTarea.trim() !== '') {
            const tarea = {
                id: Date.now(), // Un identificador único
                texto: nuevaTarea,
                completada: false
            }
            saveTareas([...tareas, tarea])
            setNuevaTarea('')
        }
    }

    
    const eliminarTarea = (id) => {
    // Ahora filtramos por id en lugar de índice
        const nuevasTareas = tareas.filter(tarea => tarea.id !== id)
        saveTareas(nuevasTareas)
    }
    // Nueva función para marcar una tarea como completada
    const toggleCompletada = (id) => {
    const nuevasTareas = tareas.map(tarea => {

        if (tarea.id === id) {
        // Si es la tarea que buscamos, cambiamos su estado
        return { ...tarea, completada: !tarea.completada }
        }
        // Si no es la tarea, la dejamos igual
        return tarea
    })
    saveTareas(nuevasTareas)
    }

    const obtenerTareasFiltradas = () => {
        switch (filtro){
            case 'completadas':
                return tareas.filter(tarea => tarea.completada)
            case 'pendientes':
                return tareas.filter(tarea => !tarea.completada)
            default:
                return tareas
        }
    }
    const contarTareas = () => {
        const total = tareas.length
        const completadas = tareas.filter(tarea => tarea.completada).length
        const pendientes = total - completadas
        return {total, completadas, pendientes}
    }
return (
    <div className='p-4 max-w-md mx-auto'>
        <h2 className='text-2xl font-bold mb-4'>Mi Lista de Tareas</h2>
        <div className='mb-4 flex gap-2'>
            <input
                type="text"
                value={nuevaTarea}
                onChange={(e) => setNuevaTarea(e.target.value)}
                placeholder="Escribe una nueva tarea"
                className='border p-2 flex-1 rounded-md'
                />
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={agregarTarea}>
                Agregar Tarea
            </button>
        </div>
        <div className='mb-4'>
            <select
                
                value={filtro}
                onChange={(e)=> setFiltro(e.target.value)}
                className='border p-2 rounded w-full'
            >
                <option value="todas">Todas las tareas</option>
                <option value="completadas">Completadas</option>
                <option value="pendientes">Pendientes</option>
            </select>
        </div>
        <div className='mb-4 text-sm text-gray-600'>
            <p>Total: {contarTareas().total}</p>
            <p>Completadas: {contarTareas().completadas}</p>
            <p>Pendientes: {contarTareas().pendientes}</p>
        </div>
        <ul className='space-y-2'>
            {tareas.map(tarea => (
            <li key={tarea.id} className='flex items-center justify-between p-2 border rounded'>
                <div className='flex items-center gap-2'>
                    <input
                        type="checkbox"
                        checked={tarea.completada}
                        onChange={() => toggleCompletada(tarea.id)}
                        className='h-4 w-4  rounded-lg hover:bg-red-500'
                        />
                    <span className={tarea.completada ? 'line-through' : ''}>

                        {tarea.texto}
                    </span>
                </div>
            <button className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600' onClick={() => eliminarTarea(tarea.id)}>
                Eliminar
            </button>
            </li>
            ))}
        </ul>
    </div>
    )
}

export { ListaTareas }