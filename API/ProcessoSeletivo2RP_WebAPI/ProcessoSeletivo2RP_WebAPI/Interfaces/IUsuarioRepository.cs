using ProcessoSeletivo2RP_WebAPI.Domains;
using ProcessoSeletivo2RP_WebAPI.ViewModels;

namespace ProcessoSeletivo2RP_WebAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        void CadastrarUsuario(UsuarioViewModel novoUsuario);
        Usuario Login(string email, string senha);
        BuscarUserViewModel BuscaUsuario(int idUsuario);
        void AlterarUsuario(UsuarioViewModel novoUsuario, int idUsuario);
        bool ExcluirUsuario(int idUsuario);
        bool AlterarStatus(int idUsuario);
    }
}
