import './AdminRoot.css'
import Header from '../../Components/Header/header'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { parseJwt } from '../../services/auth'
import { ToastContainer, toast } from 'react-toast'

export default function AdminRoot() {
    const [nomeUserCad, setNomeUserCad] = useState('')
    const [emailUserCad, setEmailUserCad] = useState('')
    const [senhaUserCad, setSenhaUserCad] = useState('')
    const [idTipoUserCadastro, setTipoUserCadastro] = useState('');
    const [userStatusCad, setUserStatusCad] = useState(undefined)
    
    const [listaUsers, setListaUsers] = useState([])
    const [nomeUser, setNomeUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [senhaUser, setSenhaUser] = useState('')
    const [idTipoUser, setTipoUser] = useState('');
    const [idUser, setIdUser] = useState('')
    const [userStatus, setUserStatus] = useState(undefined)
    const [isLoading, setisLoading] = useState(false)
    const [isSelected, setisSelected] = useState(false)

    const sucesso = () => toast.success("sucesso")
    const erro = () => toast.erro("Algo ocorreu errado, tente novamente mais tarde!")

    const ListarUsuarios = () => {

        api.get('/Usuarios/ListarTodos', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaUsers(resposta.data)
                    console.log(resposta.data)                  
                }
            })
            .catch(resposta => {
                console.log(resposta)
                sucesso();
            })
    }

    const AlterarUsuario = (event) => {
        event.preventDefault();
        setisLoading(true);


        api.put('/Usuarios/Alterar/id/' + idUser, {
            idTipoUsuario: idTipoUser,
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
                    isLoading(false)
                    isSelected(false)
                    toast.success("Usuário alterado com sucesso")
                }
            })
            .catch(resposta => {
                isLoading(false)
                isSelected(false)
                toast.error("Algo deu errado, tente novamente!")
            })


    }

    const BuscarUsuario = (event) => {

        if (event == 0) {
            setNomeUser('')
            setEmailUser('')
            setUserStatus('')

        }
        else {
            let user = listaUsers.find(u => u.idUsuario == event)
            setisSelected(true)
            setIdUser(user.idUsuario)
            setNomeUser(user.nome)
            setEmailUser(user.email)
            setUserStatus(user.userStatus)
            setTipoUserCadastro(user.idTipoUsuario)
            
        }
    }

    const DeletarUsuario = () => {
        if (idUser > 0) {
            api.delete('/Usuarios/Excluir/id/' + idUser, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
                }
            })
                .then(resposta => {
                    console.log(resposta)
                    toast.success('O usuário foi excluido com sucesso');
                    ListarUsuarios();
                    clearState();
                })
                .catch(resposta => {
                    console.log(resposta)
                    erro()
                })

        }
    }

    const CadastrarUsuario = (event) => {
        event.preventDefault();

        api.post('/Usuarios',{
            idTipoUsuario: idTipoUserCadastro,
            nome: nomeUserCad,
            email: emailUserCad,
            senha: senhaUserCad,
            userStatus: userStatusCad
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-token')
            }
        })
        .then(resposta => {
            ListarUsuarios();
            clearState();
            toast.success('O usuário foi cadastrado com sucesso')
            console.log('cadastro')
        })
        .catch(
            erro()
        )
    }

    const clearState = () => {
        setEmailUser('');
        setEmailUserCad('');
        setIdUser('');
        setNomeUser('');
        setNomeUserCad('');
        setSenhaUser('');
        setSenhaUserCad('');
        setTipoUserCadastro('');
        setUserStatusCad(undefined);
        setUserStatus(undefined);
    }

    const IsAdmin = (id) => {
        if (id == 1) {
            return false
        }
        return true
    }
    const IsRoot = (id) => {
        if (id == 2) {
            return false
        }
        return true
    }

    useEffect(
        ListarUsuarios
        , [])


    return (
        <div>
            <ToastContainer 
                position='top-right'
                delay={5000}
            />
            <Header />
            <main className='conteudoPrincipal'>
                <h2 className="conteudoPrincipal-cadastro-titulo">Lista de Usuários</h2>
                <div className="container" id="conteudoPrincipal-lista">
                    <table id="tabela-lista">
                        <thead>
                            <tr>
                                <th>Tipo de Usuário</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Status do usuário</th>
                            </tr>
                        </thead>

                        <tbody id="tabela-lista-corpo">


                            {
                                listaUsers.map((event) => {
                                    console.log(event.idUsuario)
                                    return (
                                        <tr key={event.idUsuario}>
                                            {IsAdmin(event.idTipoUsuario) ? IsRoot(event.idTipoUsuario) ? <tr>Root</tr> : <tr>Admin</tr> : <tr>Comum</tr>}
                                            <td>{event.nome}</td>
                                            <td>{event.email}</td>
                                            {event.userStatus ? <tr>Ativo</tr> : <tr>Inativo</tr>}
                                        </tr>
                                    )
                                })
                            }




                        </tbody>
                    </table>
                </div>
                <section className="container" id="conteudoPrincipal-cadastro">
                    <h2 className="conteudoPrincipal-cadastro-titulo">
                        Atualizar Usuário
                    </h2>
                    <div className="container">

                        <form className='form' onSubmit={(e) => AlterarUsuario(e)}>
                            <div className='Input' name="status">
                                <select onChange={(e) => BuscarUsuario(e.target.value)}>
                                    <option value={0} selected>Selecione o usuário que será atualizado</option>
                                    {
                                        listaUsers.map((event) => {
                                            return (
                                                <option value={event.idUsuario}>{event.nome}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>
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
                                <select value={userStatus} onChange={(e) => setUserStatus(e.target.value)}>
                                    <option value={undefined} selected>Selecione o status do usuário</option>
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
                            {
                                parseJwt().role === '3' ?
                                    isSelected ?
                                        <button type="button" onClick={DeletarUsuario} className="SubmitLogin SubmitDelete" value="Entrar">Deletar Usuario</button> :
                                        <button type="submit" className="SubmitLogin SubmitDelete" value="Entrar" disabled>Deletar Usuario</button> :
                                    <></>
                            }
                        </form>
                    </div>
                </section>

                <section className="container" id="conteudoPrincipal-cadastro">
                    <h2 className="conteudoPrincipal-cadastro-titulo">
                        Cadastro Usuário
                    </h2>
                    <div className="container">

                        <form className='form' onSubmit={(e) => CadastrarUsuario(e)}>
                            <div className='Input' name="status">
                                <select onChange={(e) => setTipoUserCadastro(e.target.value)}>
                                    <option value={0} selected>Selecione o tipo do usuário</option>
                                    <option value={1}>Usuário Comum</option>
                                    <option value={2}>Usuário Admin</option>
                                    <option value={3}>Usuário Root</option>
                                </select>

                            </div>
                            <div className='Input'>
                                <input
                                    type="text"
                                    name="name"
                                    value={nomeUserCad}
                                    onChange={(e) => setNomeUserCad(e.target.value)}
                                    placeholder='Nome'
                                ></input>
                                <label htmlFor="name">Nome</label>
                            </div>

                            <div className='Input'>
                                <input
                                    type="email"
                                    name="email"
                                    value={emailUserCad}
                                    onChange={(e) => setEmailUserCad(e.target.value)}
                                    placeholder='Nome'
                                ></input>
                                <label htmlFor="name">Email</label>
                            </div>

                            <div className='Input' name="status">
                                <select value={userStatusCad} onChange={(e) => setUserStatusCad(e.target.value)}>
                                    <option value={undefined} selected>Selecione o status do usuário</option>
                                    <option value={true}>Ativo</option>
                                    <option value={false}>Inativo</option>
                                </select>

                            </div>

                            <div className='Input'>
                                <input
                                    type="password"
                                    name="senha"
                                    value={senhaUserCad}
                                    onChange={(e) => setSenhaUserCad(e.target.value)}
                                    placeholder='senha'
                                ></input>
                                <label htmlFor="name">Senha</label>
                            </div>

                            {
                                isLoading === true ?
                                    <button className='SubmitLogin SubmitAlter' type='submit' disabled >Carregando...</button> : <button type="submit" className="SubmitLogin SubmitAlter" value="Entrar">Cadastrar</button>
                            }

                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}