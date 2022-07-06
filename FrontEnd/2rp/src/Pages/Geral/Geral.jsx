import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toast'
import Header from "../../Components/Header/header"
import api from "../../services/api"
import { parseJwt } from "../../services/auth"
import './Geral.css'

export default function Geral() {
    const [nomeUser, setNomeUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [senhaUser, setSenhaUser] = useState('')
    const [userStatus, setUserStatus] = useState(false)
    const [isLoading, setisLoading] = useState(false)

 

    const buscarUsuario = () => {

        api.get('/Usuarios/Buscar/id/' + parseJwt().jti, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }
        })
            .then(resposta => {
                setNomeUser(resposta.data.nome)
                setEmailUser(resposta.data.email)
                setUserStatus(resposta.data.userStatus)

            })
            .catch(resposta => {
                console.log(resposta)
            })

    }

    const AlterarUsuario = (event) => {
        event.preventDefault();
        setisLoading(true);
      

        api.put('/Usuarios/Alterar/id/' + parseJwt().jti, {
            idTipoUsuario: parseJwt().role,
            nome: nomeUser,
            email: emailUser,
            senha: senhaUser,
            userStatus: userStatus
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setisLoading(false)
                    toast.success('O usuário foi alterado com sucesso!')
                }
            })
            .catch(
                toast.error('Algo deu errado, tente novamente!')
            )
    }

    useEffect(
        buscarUsuario
        , [])

    return (
        <div>
            <Header />
            <ToastContainer
                position='top-right'
                delay={5000}
            />
            <main className="mainGeral">
                <h1>Vizualizar e Alterar Informações</h1>
                <form className="form" onSubmit={(e) => AlterarUsuario(e)}>
                    <div className='Input'>
                        <input
                            type="text"
                            name="name"
                            value={nomeUser}
                            onChange={(e) => setNomeUser(e.target.value)}
                            placeholder='Nome'
                        ></input>
                        <label htmlFor="name">Nome</label>
                    </div>

                    <div className='Input'>
                        <input
                            type="email"
                            name="email"
                            value={emailUser}
                            onChange={(e) => setEmailUser(e.target.value)}
                            placeholder='Nome'
                        ></input>
                        <label htmlFor="name">Email</label>
                    </div>

                    <div className='Input' name="status">
                        <select onChange={(e) => setUserStatus(e.target.value)}>
                            <option value={undefined}>Selecione o status do usuário</option>
                            <option value={true}>Ativo</option>
                            <option value={false}>Inativo</option>
                        </select>

                    </div>

                    <div className='Input'>
                        <input
                            type="password"
                            name="senha"
                            value={senhaUser}
                            onChange={(e) => setSenhaUser(e.target.value)}
                            placeholder='senha'
                        ></input>
                        <label htmlFor="name">Senha</label>
                    </div>

                    {
                        isLoading === true ?
                            <button className='SubmitLogin SubmitAlter' type='submit' disabled >Carregando...</button> : <button type="submit" className="SubmitLogin SubmitAlter" value="Entrar">Alterar Informações</button>
                    }
                </form>
            </main>
        </div>
    )
}