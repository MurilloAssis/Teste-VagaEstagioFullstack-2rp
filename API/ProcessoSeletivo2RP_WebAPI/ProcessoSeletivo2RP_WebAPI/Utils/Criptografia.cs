namespace ProcessoSeletivo2RP_WebAPI.Utils
{
    public class Criptografia
    {
        public static string gerarHash(string senha)
        {
            return BCrypt.Net.BCrypt.HashPassword(senha);
        }

        public static bool compararSenha(string senhaForm, string senhaBanco)
        {
            return BCrypt.Net.BCrypt.Verify(senhaForm, senhaBanco);
        }
    }
}
