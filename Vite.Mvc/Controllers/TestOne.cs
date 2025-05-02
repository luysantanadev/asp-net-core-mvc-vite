using Microsoft.AspNetCore.Mvc;

namespace Vite.Mvc.Controllers;

public class TestOne : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}