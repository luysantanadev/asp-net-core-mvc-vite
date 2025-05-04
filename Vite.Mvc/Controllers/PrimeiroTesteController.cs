using Microsoft.AspNetCore.Mvc;

namespace Vite.Mvc.Controllers;

public class PrimeiroTesteController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}