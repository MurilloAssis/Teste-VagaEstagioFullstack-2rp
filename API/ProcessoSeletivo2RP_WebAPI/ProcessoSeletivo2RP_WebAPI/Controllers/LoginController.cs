using Microsoft.AspNetCore.Http;
using System;
using Microsoft.AspNetCore.Mvc;
using ProcessoSeletivo2RP_WebAPI.Interfaces;
using ProcessoSeletivo2RP_WebAPI.ViewModels;
using ProcessoSeletivo2RP_WebAPI.Domains;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace ProcessoSeletivo2RP_WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public LoginController(IUsuarioRepository repo)
        {
            _usuarioRepository = repo;
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Usuario usuarioBuscado = _usuarioRepository.Login(login.Email, login.Senha);

                if (usuarioBuscado == null)
                {
                    return BadRequest(new
                    {
                        mensagem = "Email ou senha inválidos!"
                    });
                }

                var minhasClaims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, usuarioBuscado.Email.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, usuarioBuscado.IdTipoUsuario.ToString()),
                    new Claim("role", usuarioBuscado.IdTipoUsuario.ToString())
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("processoseletivo-estagio-2rp"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var meuToken = new JwtSecurityToken
                    (
                        issuer: "PS2RP_WebAPI",
                        audience: "PS2RP_WebAPI",
                        claims: minhasClaims,
                        expires: DateTime.Now.AddMinutes(90),
                        signingCredentials: creds
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(meuToken)
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
                throw;
            }
        }    
    }
}
