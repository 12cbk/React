using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Auth0.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);
var authDomain = builder.Configuration["Auth0:Domain"] ?? builder.Configuration["Auth:Domain"];
var authClientId = builder.Configuration["Auth0:ClientId"] ?? builder.Configuration["Auth:ClientId"];
//var authClientSecret = builder.Configuration["Auth0:ClientSecret"] ?? builder.Configuration["Auth:ClientSecret"];
var authCallbackPath = builder.Configuration["Auth:CallbackPath"] ?? "/callback";
var authAuthority = authDomain != null ? $"https://{authDomain}" : null;

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddHttpClient();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = "Auth0";
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
{
    options.Cookie.Name = "AUTH00000";
    options.Cookie.SameSite = SameSiteMode.None; // adjust for cross-site; in dev the proxy makes origin same
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
})
.AddOpenIdConnect("Auth0", options =>
{
    if (authAuthority == null) throw new InvalidOperationException("Auth authority not configured.");

    options.Authority = authAuthority;
    options.ClientId = authClientId;
    options.ClientSecret = "usJg6WtL_gQdiktN6BtrQDCUwFrKYbGrfNgty0it36kfbgpEyiIuUsc5Ibw7Fz-w"; // required for Regular Web App (confidential client)
    options.ResponseType = "code";
    options.SaveTokens = true;
    /*options.CallbackPath = authCallbackPath; */// this endpoint will be handled by the OIDC middleware
    //options.CallbackPath = new PathString("/signin-oidc");
    options.CallbackPath = new PathString("/callback");

    options.Scope.Clear();
    options.Scope.Add("openid");
    options.Scope.Add("profile");
    options.Scope.Add("email");
    options.Scope.Add("offline_access"); // if you want refresh tokens
    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = "name"
    };
    // optional: set events for logging
    options.Events = new OpenIdConnectEvents
    {
        OnRemoteFailure = ctx =>
        {
            // ensure failures are visible and handled
            ctx.HandleResponse();
            ctx.Response.Redirect("/error?msg=" + Uri.EscapeDataString(ctx.Failure?.Message ?? "remote failure"));
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapDefaultControllerRoute();


app.MapFallbackToFile("/index.html");

app.Run();
