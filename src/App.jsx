import RouterPage from './Routes/RouterPage'
import { ListaTareas } from './components/ListaTareas'
import { PerfilUsuario } from './components/PerfilUsuario'
import './App.css'

function App() {
  

  return (
   <>
      <h1 className='text-3xl text-center font-serif font-bold text-gray-800'>Mi Aplicacion</h1>
      {/* <ListaTareas /> */}
      {/* <PerfilUsuario /> */}
      <RouterPage />
   </>
  )
}

export default App
