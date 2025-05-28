using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Vite.Mvc.Models;

namespace Vite.Mvc.Controllers
{
    public class PrimeiroTesteController : Controller
    {
        // Simula uma base de dados em memória
        private static List<Crud> _itens = new();

        // GET: /PrimeiroTeste
        public IActionResult Index()
        {
            return View(_itens);
        }

        // GET: /PrimeiroTeste/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: /PrimeiroTeste/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Crud model)
        {
            if (ModelState.IsValid)
            {
                model.Id = Guid.NewGuid();
                _itens.Add(model);
                return RedirectToAction(nameof(Index));
            }

            return View(model);
        }

        // GET: /PrimeiroTeste/Edit/{id}
        public IActionResult Edit(Guid id)
        {
            var item = _itens.FirstOrDefault(x => x.Id == id);
            if (item == null)
                return NotFound();

            return View(item);
        }

        // POST: /PrimeiroTeste/Edit/{id}
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Guid id, Crud model)
        {
            var item = _itens.FirstOrDefault(x => x.Id == id);
            if (item == null)
                return NotFound();

            if (ModelState.IsValid)
            {
                item.Nome = model.Nome;
                return RedirectToAction(nameof(Index));
            }

            return View(model);
        }

        // GET: /PrimeiroTeste/Delete/{id}
        public IActionResult Delete(Guid id)
        {
            var item = _itens.FirstOrDefault(x => x.Id == id);
            if (item == null)
                return NotFound();

            return View(item);
        }

        // POST: /PrimeiroTeste/Delete/{id}
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(Guid id)
        {
            var item = _itens.FirstOrDefault(x => x.Id == id);
            if (item == null)
                return NotFound();

            _itens.Remove(item);
            return RedirectToAction(nameof(Index));
        }
    }
}
