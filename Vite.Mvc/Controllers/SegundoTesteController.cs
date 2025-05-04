using Microsoft.AspNetCore.Mvc;

namespace Vite.Mvc.Controllers;

public sealed class SegundoTesteController: Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}