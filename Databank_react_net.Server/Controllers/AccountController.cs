using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Databank_react_net.Server.Controllers;

[ApiController]
[Route("account")]
public class AccountController : Controller
{

    private readonly IConfiguration _config;

    public AccountController(IConfiguration config)
    {
        _config = config;
    }
    // GET /account/login?returnUrl=/Managefeed
    [HttpGet("login")]
    public IActionResult Login([FromQuery] string returnUrl = "/")
    {
        var frontendBase = _config["Frontend:BaseUrl"];
        var props = new AuthenticationProperties
        {
            RedirectUri = $"{frontendBase}{returnUrl}"
        };
        return Challenge(props, "Auth0");
    }


    // callback path handled by OIDC middleware; if you want a manual endpoint:
    [HttpGet("callback")]
    public IActionResult Callback()
    {
        // OIDC middleware already processed tokens and created the cookie.
        // Redirect back to SPA route or to a server page.
        return LocalRedirect("/");
    }

    // POST /account/logout
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        // Sign out locally (cookie) and at the identity provider
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        await HttpContext.SignOutAsync("Auth0", new AuthenticationProperties
        {
            RedirectUri = Url.Content("~/")
        });
        return Ok();
    }

    // GET /account/user  -> returns current user claims as JSON (for SPA to read)
    [Authorize]
    [HttpGet("user")]
    public IActionResult UserInfo()
    {
        if (!User.Identity?.IsAuthenticated ?? true)
            return Unauthorized(new { error = "not_authenticated" });

        var result = User.Claims.ToDictionary(c => c.Type, c => c.Value);
        return Ok(new { authenticated = true, user = result });
    }
}