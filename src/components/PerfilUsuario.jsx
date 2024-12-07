import React from 'react'
import { useState } from 'react'
import { Link }  from 'react-router-dom'
import './PerfilUsuario.css'
function PerfilUsuario() {

    const localUser = localStorage.getItem('user')
    let paset;
   

        if(!localUser){
            localStorage.setItem('user', JSON.stringify({}))
            paset = {}
            
        }else{
            paset = JSON.parse(localUser)
        }

    const [usuario, setUsuario] = useState({
        nombre: '',
        edad: '',
        email: '',
        ciudad: '',
    })

    const saveUser = (newUser) => {
        localStorage.setItem('user', JSON.stringify(newUser))
        setUsuario(newUser)
    }

    const [errores, setErrores] = useState({})

    const [enviando, setEnviando] = useState(false)

    // Función para validar un campo específico
    const validarCampo = (campo, valor) => {
    let mensajeError = ''
    // // Validamos según el tipo de campo
        switch (campo) {
        case 'nombre':
            if (valor.trim().length < 3) {
                mensajeError = 'El nombre debe tener al menos 3 caracteres'
            }
            break
        case 'edad':
            const edadNum = Number(valor)
            if (edadNum < 0 || edadNum > 120) {
                mensajeError = 'La edad debe estar entre 0 y 120 años'
            }
            break
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(valor)) {
                mensajeError = 'Por favor ingresa un email válido'
           }else{
            mensajeError = ''
           }
            break
        }
        // Actualizamos el estado de errores
        setErrores(erroresActuales => ({
            ...erroresActuales,
            [campo]: mensajeError
        }))
        return mensajeError === ''
    }
    const actualizarCampo = (campo, valor)=>{
        saveUser({
            ...usuario,
            [campo]: valor

        })
        validarCampo(campo, valor)
    }

    const limpiarFormulario = () => {
        saveUser({
            nombre: '',
            edad: '',
            email: '',
            ciudad: '',
        })
        setErrores({}) 
    }



    // nueva funcion para manejar el envio del formulario
    const manejarEnvio = async (e) => {
        e.preventDefault() // prevenimos el recargo del formulario
        setEnviando(true)

        //validamos todos los campos antes de enviar
        const camposAValidar = ['nombre','email', 'edad', 'ciudad']
        let formularioValido = true
        for(const campo of camposAValidar){
            const esValido = validarCampo(campo, usuario[campo])
            if(!esValido){
                formularioValido = false
            }
        }
        if(formularioValido){
            try{
                // simulamos una llamada a una API
                await new Promise(resolve => setTimeout(resolve, 1000))
                // const mayus = paset.nombre.split('').upperCase().join('')
                document.getElementById('h1').innerHTML = `${paset.nombre} El  Registro fue exitoso`
            
                
                // si todo va bien, limpiamos el formulario
                // limpiarFormulario()
            }catch(error){
                alert('Error al actualizar el perfil')
            }
        }else{
            alert('Por favor, corrige los errores en el formulario')
        }
        setEnviando(false) // terminamos el estado de carga
    }

   
    

  return (
    <div className='p-4 max-w-md mx-auto'>
        <h2 className='text-4xl font-bold mb-4 text-center'>Perfil de Usuario</h2>
            <h1 className='text-2xl font-bold' id='h1'></h1>
        <Link to="/listaTareas">
            <button className='exit' id='exito'>Ir a la lista de tareas</button>
        </Link>
        <form onSubmit={manejarEnvio} className='space-y-4'>
            <div className='flex space-x-2'>
                <button 
                    type='submit'
                    disabled={enviando}
                    className={`px-4 py-2 rounded text-white ${enviando ? 'bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {enviando ? 'Guardando...' : 'Guardar Perfil'}
                  

                    </button>
                    <button
                        type="button"
                        onClick={limpiarFormulario}
                        disabled={enviando}
                        className="px-4 py-2 bg-gray-500 text-white round
                        ed hover:bg-gray-600"
                        >
                        Limpiar
                    </button>
            </div>
            <p className='text-sm text-gray-500'>
                Los campos marcado con * son obligatorios
            </p>
            {/* Vista previa de datos */}
            {/* <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Datos del Usuario:</h3
            >
            <pre className="text-sm">
            {JSON.stringify(usuario, null, 2)}
            </pre>
            </div>
                */}

            {/* <div className='mt-4 p-4 bg-gray-100 rounded'>
                    <h3 className='font-bold mb-2'>Datos del Usuario:</h3
                    >
                    <pre className="text-sm">
                    {JSON.stringify(paset, null, 2)}
                    </pre>
                </div> */}
    
               

                <div className='mt-4 p-4 bg-gray-100 rounded'>
                    <h3 className='font-bold mb-2'>Datos del Usuario:</h3
                    >
                    <pre className="text-sm">
                    {JSON.stringify(paset, null, 2)}
                    </pre>

                </div>
             
            
            
        
        </form>
        {/* Campo nombre con mensaje de error */}
        <div className='mb-4'>
            <label className='block mb-1'>Nombre:</label>
            <input
                type='text'
                value={usuario.nombre}
                onChange={(e) => actualizarCampo('nombre', e.target.value)}
                className={`border p-2 w-full rounded ${errores.nombre ? 'border-red-500' : ''}`}
            />
            {errores.nombre && (<p className='text-red-500 text-sm mt-1'>{errores.nombre}</p>)}
        </div>

        {/* campo edad con mensaje de error */}
        <div className="mb-4">
            <label className="block mb-1">Edad:</label>
            <input 

                type="number"
                value={usuario.edad}
                onChange={(e) => actualizarCampo('edad', e.target.value)}
                className={`border p-2 w-full rounded ${errores.edad ? 'border-red-500' : ''}`}
            />
            {errores.edad && (
                <p className='text-red-500 text-sm mt-1'>{errores.edad}</p>
            )}
        </div>

        {/* Campo email con mensaje de error  */}
        <div className="mb-4">
            <label className="block mb-1">Email:</label>
            <input 
                type="email"
                value={usuario.email}
                onChange={(e) => actualizarCampo('email', e.target.value)}
                className={`border p-2 w-full rounded ${errores.email ? 'border-red-500' : ''}`}
            />
            {errores.email && (
                <p className='text-red-500 text-sm mt-1'>{errores.email}</p>
            )}
        </div>

        

        {/* Campo ciudad  */}
        <div className="mb-4">
            <label className="block mb-1">Ciudad:</label>
            <input 
                type="text"
                value={usuario.ciudad}
                onChange={(e) => actualizarCampo('ciudad', e.target.value)}
                className={`border p-2 w-full rounded ${errores.ciudad ? 'border-red-500' : ''}`}
            />
            {errores.ciudad && (
                <p className='text-red-500 text-sm mt-1'>{errores.ciudad}</p>
            )}
        </div>

            {/* vista previa de datos  */}
        {/* <div className='mt-4 p-4 bg-gray-100 rounded'>
            <h3 className='font-bold mb-2'>Datos del Usuario</h3>
            <pre>{JSON.stringify(usuario, null, 2 )}</pre>
            
        </div> */}
    </div>
    
  )
}


export { PerfilUsuario }