using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Vite.Mvc.Models;

namespace Vite.Mvc.Controllers;

public sealed class SegundoTesteController : Controller
{
    private static readonly List<Crud> _itens = new();


    public IActionResult Index() => View();
    
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_itens);
    }

    [HttpGet("{id:guid}")]
    public IActionResult GetById(Guid id)
    {
        var item = _itens.FirstOrDefault(x => x.Id == id);
        if (item == null)
            return NotFound();

        return Ok(item);
    }

    [HttpPost]
    public IActionResult Create(Crud model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        model.Id = Guid.NewGuid();
        _itens.Add(model);
        return CreatedAtAction(nameof(GetById), new { id = model.Id }, model);
    }

    
    [HttpPost]
    public IActionResult Update(Crud model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var item = _itens.FirstOrDefault(x => x.Id == model.Id);
        if (item == null)
            return NotFound();

        item.Nome = model.Nome;
        return NoContent();
    }

    // DELETE: api/segundoteste/{id}
    [HttpPost]
    public IActionResult Delete(Guid id)
    {
        var item = _itens.FirstOrDefault(x => x.Id == id);
        if (item == null)
            return NotFound();

        _itens.Remove(item);
        return NoContent();
    }
}