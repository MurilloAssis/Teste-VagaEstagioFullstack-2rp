using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
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
        public IActionResult CadastrarUsuario(UsuarioViewModel novoUsuario)
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

        [Authorize]
        [HttpPut("Alterar/id/{idUsuario:int}")]
        public IActionResult AlterarUsuario(UsuarioViewModel novoUsuario, int idUsuario)
        {
            int idTipoUserLogado = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value);
            if (novoUsuario == null)
            {
                return BadRequest(new
                {
                    Mensagem = "Informações inseridas estão inválidas"
                });
            }

            if (idTipoUserLogado == 1)
            {
                int id = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                if (id == idUsuario)
                {
                    _usuarioRepository.AlterarUsuario(novoUsuario, idUsuario);
                    return Ok(new
                    {
                        Mensagem = "Usuário alterado com sucesso!"
                    });
                }

                return StatusCode(403, new
                {
                    Mensagem = "Você não tem autorização para fazer alterações no perfil indicado"
                });
            }
            else
            {
                _usuarioRepository.AlterarUsuario(novoUsuario, idUsuario);
                return Ok(new
                {
                    Mensagem = "Usuário alterado com sucesso!"
                });
            }
        }

        [Authorize(Roles = "3")]
        [HttpDelete("Excluir/id/{idUsuario:int}")]
        public IActionResult ExcluirUsuario(int idUsuario)
        {
            if (idUsuario > 0)
            {
                if (_usuarioRepository.ExcluirUsuario(idUsuario))
                {
                    return StatusCode(204, new
                    {
                        Mensagem = "O usuário foi excluido do sistema com sucesso"
                    });
                }
                return StatusCode(404, new
                {
                    Mensagem = "O id informado não corresponde a nenhum usuário"
                });
            }
            return BadRequest(new
            {
                Mensagem = "O id informado é inválido"
            });
        }

        [Authorize]
        [HttpGet("Buscar/id/{idUsuario:int}")]
        public IActionResult BuscarPorId(int idUsuario)
        {
            if (idUsuario > 0)
            {
                int idTipoUserLogado = Convert.ToInt32(HttpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value);
                int idLogado = Convert.ToInt32(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Jti).Value);

                if (idTipoUserLogado == 1)
                {
                    if (idLogado == idUsuario)
                    {
                        BuscarUserViewModel user = _usuarioRepository.BuscaUsuario(idUsuario);
                        return Ok(user);
                    }

                    return StatusCode(403, new
                    {
                        Mensagem = "Você não possui autorização para buscar esse usuário"
                    });
                }

                BuscarUserViewModel usuario = _usuarioRepository.BuscaUsuario(idUsuario);
                if (usuario == null) return NotFound(new
                {
                    Mensagem = "Não há nenhum usuário no sistema com o id informado"
                });

                return Ok(usuario);
            }

            return BadRequest(new
            {
                Mensagem = "O id informado é inválido!"
            });
        }

        [Authorize(Roles = "2, 3")]
        [HttpGet("ListarTodos")]
        public IActionResult ListarTodos()
        {
            var lista = _usuarioRepository.ListarUsers();

            if (lista != null)
            {
                return Ok(lista);
            }
            return NoContent();
        }

        [Authorize(Roles = "2, 3")]
        [HttpPatch("AlterarStatus/id/{idUsuario:int}")]
        public IActionResult AlterarStatus(int idUsuario)
        {
            if (idUsuario > 0)
            {
                _usuarioRepository.AlterarStatus(idUsuario);
                return Ok(new
                {
                    Mensagem = "O status do usuário foi alterado!"
                });
            }
            return BadRequest(new
            {
                Mensagem = "O id inserido é inválido"
            });
        }
    }
}
