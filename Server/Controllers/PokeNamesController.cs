using Microsoft.AspNetCore.Mvc;
using PokeBattleSupport.Shared;
using Grpc.Net.Client;
using GrpcPoke;

namespace PokeBattleSupport.Server.Controllers
{
    // [controller]�̓N���X������Contrller����菜�������̂ɒu�������
    [ApiController]
    [Route("api/[controller]")]
    public class PokeNamesController : ControllerBase
    {
        private readonly ILogger<PokeNamesController> _logger;

        public PokeNamesController(ILogger<PokeNamesController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<string>> GetAsync()
        {
            using var channel = GrpcChannel.ForAddress("https://localhost:7191");
            var client = new PokeSrv.PokeSrvClient(channel);
            PokeNames pokeNames = await client.GetPokeNamesAsync(new Empty());

            return pokeNames.Items.Select(x => x.Name);
        }
    }
}