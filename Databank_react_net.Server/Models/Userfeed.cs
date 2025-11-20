using System.Text.Json.Serialization;

namespace Databank_react_net.Server.Models
{
    public class Userfeed
    {
        [JsonPropertyName("id")]
        public string id { get; set; } = string.Empty;
        [JsonPropertyName("name")]
        public string name { get; set; } = string.Empty;
        [JsonPropertyName("Ldat")]
        public string Ldat { get; set; } = string.Empty;
        [JsonPropertyName("Lrun")]
        public string Lrun { get; set; } = string.Empty;
        [JsonPropertyName("Nrun")]
        public string Nrun { get; set; } = string.Empty;

        [JsonPropertyName("Freq")]
        public string Freq { get; set; } = string.Empty;
        [JsonPropertyName("DM")]
        public string DM { get; set; } = string.Empty;
    }
}
