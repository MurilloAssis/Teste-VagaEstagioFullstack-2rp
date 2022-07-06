namespace ProcessoSeletivo2RP_WebAPI.ViewModels
{
    public class BuscarUserViewModel
    {
        public int IdUsuario { get; set; }
        public short? IdTipoUsuario { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public bool UserStatus { get; set; }
    }
}
