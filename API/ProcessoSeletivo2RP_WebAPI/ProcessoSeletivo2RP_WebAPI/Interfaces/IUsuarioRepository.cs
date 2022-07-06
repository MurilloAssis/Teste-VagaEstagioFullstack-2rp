using ProcessoSeletivo2RP_WebAPI.Domains;
using ProcessoSeletivo2RP_WebAPI.ViewModels;
using System.Collections.Generic;

namespace ProcessoSeletivo2RP_WebAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        void CadastrarUsuario(UsuarioViewModel novoUsuario);
        Usuario Login(string email, string senha);
        List<BuscarUserViewModel> ListarUsers();
        BuscarUserViewModel BuscaUsuario(int idUsuario);
        void AlterarUsuario(UsuarioViewModel novoUsuario, int idUsuario);
        bool ExcluirUsuario(int idUsuario);
        bool AlterarStatus(int idUsuario);
    }
}
