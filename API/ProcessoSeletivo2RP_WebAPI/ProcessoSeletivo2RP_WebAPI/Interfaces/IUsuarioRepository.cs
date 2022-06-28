using ProcessoSeletivo2RP_WebAPI.Domains;

namespace ProcessoSeletivo2RP_WebAPI.Interfaces
{
    public interface IUsuarioRepository
    {
        void CadastrarUsuario(Usuario novoUsuario);
        Usuario Login(string email, string senha);
        Usuario BuscaUsuario(int idUsuario);
        void AlterarUsuario(Usuario novoUsuario, int idUsuario);
        void ExcluirUsuario(int idUsuario);
        void AlterarStatus(int idUsuario);
    }
}
