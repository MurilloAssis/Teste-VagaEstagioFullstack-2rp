namespace ProcessoSeletivo2RP_WebAPI.ViewModels
{
    public class CadastroViewModel
    {
        public short? IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public bool UserStatus { get; set; }
    }
}
