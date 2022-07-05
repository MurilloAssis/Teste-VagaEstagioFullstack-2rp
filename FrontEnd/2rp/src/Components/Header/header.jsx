import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../../Assets/css/header.css'
import logo from '../../Assets/img/logo2RP.png'
import api from '../../services/api';
import { parseJwt, usuarioAutenticado } from '../../services/auth.js'

export default function Header() {

    const [user, setUser] = useState({})

    const buscarUser = () => {
        api.get('/Usuarios/Buscar/id/'+ parseJwt().jti, {
            headers:{
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }
        })
        .then(resposta => {
            setUser(resposta.data)
        })
        .catch(resposta => {
            console.log(resposta)
        })
    }

    useEffect(
        buscarUser
    ,[])

    return (
        
            <header className='header'>
                <div className="container container_header container_header_Comp">
                    <Link to="/"><img className='logo' src={logo}></img></Link>
                    <div className='navHeader'>
                        <p>Olá {user.nome}!</p>
                        {
                            usuarioAutenticado() ? <Link to="/"><button onClick={() => localStorage.clear()} >Logout</button></Link> : <Link to="/login"><button>Login</button></Link>
                        }
                        {
                            localStorage.getItem('usuario-token') !== null && 
                             (parseJwt().role === '2' || parseJwt().role === '3' ) ?
                            <Link to="/cadastroUsuario"><button>Cadastrar</button></Link> : <button></button>                          
                        }

                    </div>
                </div>
            </header>
        
    )

}