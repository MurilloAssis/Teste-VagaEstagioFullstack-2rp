import React, {useState} from 'react'
import axios from 'axios'
import api from '../../services/api'
import { useHistory } from 'react-router-dom'


export default function Login(){
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('')

    const FazerLogin = (event) => {
        event.preventDefault();

        api.post('/Login',{
            email: email,
            senha: senha
        })
        .then(resposta => {
            if(resposta.status === 200){
                localStorage.setItem('usuario-token', resposta.data.token)
            }
        })
        .catch(resposta => {
            console.log(resposta)
        })
    }

    return(
        <div>
            <form onSubmit={(event) => FazerLogin(event)}>
                <input type="email" name="email" placeholder="Digite seu email" valu={email} onChange={(evt) => setEmail(evt.target.value)}/>
                <label for="email">Email</label>
                <input type="password" name="senha" placeholder="Digite sua senha" valu={senha} onChange={(evt) => setSenha(evt.target.value)}/>
                <label for="senha">Senha</label>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}