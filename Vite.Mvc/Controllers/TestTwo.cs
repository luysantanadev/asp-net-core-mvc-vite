using Microsoft.AspNetCore.Mvc;

namespace Vite.Mvc.Controllers;

public sealed class TestTwo: Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}