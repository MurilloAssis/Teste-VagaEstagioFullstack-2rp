using ProcessoSeletivo2RP_WebAPI.Contexts;
using ProcessoSeletivo2RP_WebAPI.Domains;
using ProcessoSeletivo2RP_WebAPI.Interfaces;
using ProcessoSeletivo2RP_WebAPI.Utils;
using ProcessoSeletivo2RP_WebAPI.ViewModels;
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

        public void AlterarUsuario(UsuarioViewModel novoUsuario, int idUsuario)
        {
            if (novoUsuario != null)
            {
                Usuario user = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);
                string senhaHash = Criptografia.gerarHash(novoUsuario.Senha);

                user.Email = novoUsuario.Email; 
                user.Senha = senhaHash;
                user.Nome = novoUsuario.Nome;
                user.UserStatus = novoUsuario.UserStatus;
                user.IdTipoUsuario = novoUsuario.IdTipoUsuario;

                ctx.Usuarios.Update(user);
                ctx.SaveChanges();
            }
        }

        public BuscarUserViewModel BuscaUsuario(int idUsuario)
        {
            Usuario user = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);

            BuscarUserViewModel userView = new BuscarUserViewModel();
            userView.Email = user.Email;
            userView.Nome = user.Nome;
            userView.UserStatus = user.UserStatus;
            userView.Nome = user.Nome;
            return userView;
        }

        public void CadastrarUsuario(UsuarioViewModel novoUsuario)
        {
            if (novoUsuario.Nome != null && novoUsuario.Email != null && novoUsuario.Senha != null)
            {
                string senhaHash = Criptografia.gerarHash(novoUsuario.Senha);

                Usuario user = new Usuario();
                user.Nome = novoUsuario.Nome;
                user.Email = novoUsuario.Email;
                user.Senha = senhaHash;
                user.IdTipoUsuario = novoUsuario.IdTipoUsuario;
                user.UserStatus = novoUsuario.UserStatus;
            
                ctx.Usuarios.Add(user);
                ctx.SaveChanges();
            }
        }

        public bool ExcluirUsuario(int idUsuario)
        {
            Usuario user = ctx.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);
            if (user == null) return false;

            ctx.Usuarios.Remove(user);
            ctx.SaveChanges();
            return true;
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
