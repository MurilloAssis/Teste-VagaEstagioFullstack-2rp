using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProcessoSeletivo2RP_WebAPI.Domains;
using ProcessoSeletivo2RP_WebAPI.Interfaces;
using ProcessoSeletivo2RP_WebAPI.ViewModels;

namespace ProcessoSeletivo2RP_WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuariosController(IUsuarioRepository repo)
        {
            _usuarioRepository = repo;
        }

        [Authorize(Roles = "2, 3")]
        [HttpPost]
        public IActionResult CadastrarUsuario(CadastroViewModel novoUsuario)
        {
            try
            {
                if (novoUsuario != null)
                {
                    _usuarioRepository.CadastrarUsuario(novoUsuario);
                    return StatusCode(201, new
                    {
                        Mensagem = $"Novo usuário cadastrado: {novoUsuario.Nome}"
                    });
                }
                return BadRequest(new
                {
                    Mensagem = "Os dados inseridos são inválidos ou estão faltando!"
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
