using Databank_react_net.Server.Models;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Xml;

namespace Databank_react_net.Server.Controllers
{
    [ApiController]
    [Route("api")]
    public class ProxyApiController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly ILogger<ProxyApiController> _logger;
        private readonly IWebHostEnvironment _env;

        public ProxyApiController(IHttpClientFactory httpClientFactory, ILogger<ProxyApiController> logger, IWebHostEnvironment env)
        {
            _httpClientFactory = httpClientFactory;
            _logger = logger;
            _env = env;
        }

        [HttpGet("options")]
        public async Task<IActionResult> GetOptions([FromQuery] string category)
        {
            try
            {
                _logger.LogInformation("server proxy category: {category}", category);
                string url = "";
                if (category == "catco")
                {
                    url = "https://databank.oup.com/cgi-bin/starfinder/0?path=groups.txt&id=fastgroups&pass=lerom&search=y&format=WEBPREV2";
                }
                else if (category == "ELT")
                {
                    url = "https://databank.oup.com/cgi-bin/starfinder/0?path=ptypes.txt&id=fastmyreps&pass=seya&format=WEBPREV2";
                }

                else
                {
                        return BadRequest(new { error = "invalid category" });
                }



                var client = _httpClientFactory.CreateClient();
                var html = await client.GetStringAsync(url);

                var doc = new HtmlDocument();
                doc.LoadHtml(html);

                var optionNodes = doc.DocumentNode.SelectNodes("//select[@name='test']//option") ?? Enumerable.Empty<HtmlNode>();

                var parsed = optionNodes.Select(n => new
                {
                    value = n.GetAttributeValue("value", ""),
                    text = WebUtility.HtmlDecode(n.InnerText?.Trim() ?? "")
                });

                return Ok(parsed);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Parse error");
                return StatusCode(500, new { error = "Parse error" });
            }
        }

        [HttpGet("feeds/{feedid?}")]
        public async Task<IActionResult> GetFeeds([FromRoute] string? feedid)
        {
            try
            {
               
                if (string.IsNullOrWhiteSpace(feedid))
                {
                    feedid = "5a79dee0-13da-11f0-8779-4f8904588f02";
                }

                var encoded = Uri.EscapeDataString(feedid);
                var feedsUrl = $"https://databank.oup.com/cgi-bin/starfinder/0?path=myreps.txt&id=fastmyreps&pass=seya&search={encoded}&format=WEBPREVIEW";

                var client = _httpClientFactory.CreateClient();
                var html = await client.GetStringAsync(feedsUrl);

                var doc = new HtmlDocument();
                doc.LoadHtml(html);

                var rowNodes = doc.DocumentNode.SelectNodes("//table//tbody//tr") ?? Enumerable.Empty<HtmlNode>();

                var parsed = rowNodes.Select(tr =>
                {
                    var cells = tr.SelectNodes("td")?.Select(td => WebUtility.HtmlDecode(td.InnerText.Trim())).ToArray() ?? Array.Empty<string>();

                    return new Userfeed
                    {
                        name = cells.ElementAtOrDefault(0) ?? "",
                        Ldat = cells.ElementAtOrDefault(1) ?? "",
                        Lrun = cells.ElementAtOrDefault(2) ?? "",
                        Nrun = cells.ElementAtOrDefault(3) ?? "",    
                        Freq = cells.ElementAtOrDefault(4) ?? "",
                        DM = cells.ElementAtOrDefault(5) ?? "",       
                        id = cells.ElementAtOrDefault(6) ?? ""
                    };
                }).ToArray();

                _logger.LogInformation("Parsed feeds (count): {count}", parsed.Length);
                return Ok(parsed); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Feeds proxy error");
                return StatusCode(500, new { error = "Failed to load feeds" });
            }
        }

        [HttpGet("fastedit")]
        public async Task<IActionResult> FastEdit([FromQuery] string search)
        {
            if (string.IsNullOrWhiteSpace(search))
                return BadRequest(new { error = "missing search param" });

            try
            {
                _logger.LogInformation("server fastedit search: {search}", search);

                var remote = $"https://databank.oup.com/cgi-bin/starfinder/0?path=fastedit.txt&id=fastmyreps&pass=seya&search={Uri.EscapeDataString(search)}&format=WEBPREV2";

                var client = _httpClientFactory.CreateClient();
                var html = await client.GetStringAsync(remote);

                return Content(html, "text/html", Encoding.UTF8);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "fastedit proxy error");
                return StatusCode(500, new { error = "Failed to fetch fastedit" });
            }
        }

        [HttpGet("flexiblecode/{type}")]
        public async Task<IActionResult> Getflexiblecode([FromRoute] string type)
        {
            try
            {
                var filePath = Path.Combine(_env.ContentRootPath, $"{type}.json");
                if (!System.IO.File.Exists(filePath))
                {
                    return NotFound(new { error = $"{type}.json not found" });
                }

                using var stream = System.IO.File.OpenRead(filePath);
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var data = await JsonSerializer.DeserializeAsync<Dictionary<string, List<Subject>>>(stream, options);

                if (data == null)
                {
                   
                    return StatusCode(500, new { error = "Failed to parse subject.json" });
                }
                return Ok(data);

                
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error reading subject.json");
                return StatusCode(500, new { error = "Failed to load subject data" });
            }
        }
    }
}