using ProcessoSeletivo2RP_WebAPI.Contexts;
using ProcessoSeletivo2RP_WebAPI.Domains;
using ProcessoSeletivo2RP_WebAPI.Interfaces;
using ProcessoSeletivo2RP_WebAPI.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProcessoSeletivo2RP_WebAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        PSRPContext ctx = new PSRPContext();
        public void AlterarStatus(int idUsuario)
        {
            throw new System.NotImplementedException();
        }

        public void AlterarUsuario(Usuario novoUsuario, int idUsuario)
        {
            throw new System.NotImplementedException();
        }

        public Usuario BuscaUsuario(int idUsuario)
        {
            throw new System.NotImplementedException();
        }

        public void CadastrarUsuario(Usuario novoUsuario)
        {
            if (novoUsuario.Nome != null && novoUsuario.Email != null && novoUsuario.Senha != null)
            {
                string senhaHash = Criptografia.gerarHash(novoUsuario.Senha);
                novoUsuario.Senha = senhaHash;
                ctx.Usuarios.Add(novoUsuario);
                ctx.SaveChanges();
            }
        }

        public void ExcluirUsuario(int idUsuario)
        {
            throw new System.NotImplementedException();
        }

        public Usuario Login(string email, string senha)
        {
            Usuario usuario = ctx.Usuarios.FirstOrDefault(u => u.Email == email);
            if (usuario != null)
            {
                if(usuario.Senha.Length != 60 && usuario.Senha[0].ToString() != "$")
                {
                    if (senha == usuario.Senha)
                    {
                        string senhaHash = Criptografia.gerarHash(usuario.Senha);
                        usuario.Senha = senhaHash;
                        ctx.Usuarios.Update(usuario);
                        ctx.SaveChanges();

                        return usuario;
                    }
                    else
                    {
                        return null;
                    }
                }

                bool confere = Criptografia.compararSenha(senha, usuario.Senha);
                if (confere)
                    return usuario;
            }
            return null;
        }
    }
}
