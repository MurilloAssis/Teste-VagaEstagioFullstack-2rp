import React, { useState } from 'react'
import axios from 'axios'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'
import Header from '../../Components/Header/header'
import logo from '../../Assets/img/logo2RP.png'
import './Login.css'
import { parseJwt } from '../../services/auth'

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let history = useHistory();

    const FazerLogin = (event) => {
        event.preventDefault();
        setIsLoading(true);
        

        api.post('/Login', {
            email: email,
            senha: senha
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    localStorage.setItem('usuario-token', resposta.data.token)
                    setIsLoading(false);
                    console.log(parseJwt())

                    if(parseJwt().role === '1'){
                        history.push('/geral')
                    }
                    else{
                        history.push('/admin')
                    }
                }
            })
            .catch(resposta => {
                console.log(resposta);
                setIsLoading(false);
            })
    }

    return (
        <div>
            <header className='header'>
                <div className="container container_header">
                    <img className='logo' src={logo}></img>
                    {/* <div>
                        {
                            usuarioAutenticado() ? <Link to="/"><button onClick={() => localStorage.clear()} >Logout</button></Link> : <Link to="/login"><button>Login</button></Link>
                        }
                        {
                            localStorage.getItem('usuario-token') !== null && 
                             (parseJwt().role === '1' || parseJwt().role === '2' ) ?
                            <Link to="/cadastroUsuario"><button>Cadastrar</button></Link> : <button></button>
                        }

                    </div> */}
                </div>
            </header>
            


                <div className='body-login'>

                    <section className='container-login'>

                        <div className='box-login'>
                            <h1>Login</h1>
                            <form onSubmit={(event) => FazerLogin(event)} className='FormLogin'>

                                <div className='Input'>

                                    <input
                                        type="text"
                                        name="Email"
                                        placeholder='Digite seu email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                    <label htmlFor="Email">Email</label>
                                </div>

                                <div className='Input'>

                                    <input
                                        type="password"
                                        name="password"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder='Digite sua senha'
                                    ></input>
                                    <label htmlFor="password">Senha</label>
                                </div>

                                {
                                    isLoading === true ?
                                        <button className='SubmitLogin' type='submit' disabled >Carregando...</button> : <button type="submit" className="SubmitLogin" value="Entrar">Fazer Login</button>
                                }

                            </form>
                        </div>
                    </section>

                </div>
            
        </div>
    )
}