import React from 'react'
import { Link } from 'react-router-dom'
import './Inicio.css'

function Inicio(){
    return (
        <div className='p-4 max-w-md mx-auto'>
            <h2 className='text-4xl text-center mt-16 font-bold mb-4'>¡Bienvenido! Escoge una opción</h2>
            <div className='flex flex-row mt-20 justify-center gap-16'>
                <Link to='/listaTareas'>
                    <button className="bg-blue-300 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded shadow-lg transition duration-300">Ir a la lista de tareas</button>
                </Link>
                <Link to='/perfilUsuario'>
                    <button className="bg-blue-300 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded shadow-lg transition duration-300">Ir al formulario</button>
                </Link>
            </div>
        </div>
    )   
}

export { Inicio }