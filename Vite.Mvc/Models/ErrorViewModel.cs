using System;
using System.ComponentModel.DataAnnotations;

namespace Vite.Mvc.Models;

public class ErrorViewModel
{
    public string? RequestId { get; set; }

    public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
}

public class Crud
{
    public Crud()
    {
        Id = Guid.NewGuid();
    }

    public Guid Id { get; set; }

    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MinLength(3, ErrorMessage = "O nome deve ter no mínimo 3 caracteres.")]
    [MaxLength(20, ErrorMessage = "O nome deve ter no máximo 20 caracteres.")]
    public string Nome { get; set; }
}