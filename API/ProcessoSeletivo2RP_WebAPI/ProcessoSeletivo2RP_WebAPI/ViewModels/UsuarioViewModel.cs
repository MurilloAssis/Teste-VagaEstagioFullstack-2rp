namespace ProcessoSeletivo2RP_WebAPI.ViewModels
{
    public class UsuarioViewModel
    {
        public short? IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public bool UserStatus { get; set; }
    }
}
