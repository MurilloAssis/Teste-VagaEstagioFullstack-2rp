using ProcessoSeletivo2RP_WebAPI.Domains;
using ProcessoSeletivo2RP_WebAPI.ViewModels;

namespace ProcessoSeletivo2RP_WebAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        void CadastrarUsuario(UsuarioViewModel novoUsuario);
        Usuario Login(string email, string senha);
        Usuario BuscaUsuario(int idUsuario);
        void AlterarUsuario(UsuarioViewModel novoUsuario, int idUsuario);
        void ExcluirUsuario(int idUsuario);
        void AlterarStatus(int idUsuario);
    }
}
