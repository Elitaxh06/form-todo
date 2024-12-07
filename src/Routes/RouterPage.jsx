import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PerfilUsuario } from '../components/PerfilUsuario'
import { ListaTareas } from '../components/ListaTareas'
export default function RouterPage() {
    return (
        <>
            <Routes>
                <Route path='/' element={<PerfilUsuario/>} />
                <Route path='/listaTareas' element={<ListaTareas/>} />
            </Routes>
        </>
    )
}
