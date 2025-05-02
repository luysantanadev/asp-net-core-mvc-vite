# ASP.NET Core MVC + Vite.js + AdminLTE Integration

Este repositório demonstra como integrar o ASP.NET Core MVC com o Vite.js, utilizando o template AdminLTE para construir interfaces administrativas modernas.

# 🧩 Tecnologias utilizadas
- [ASP.NET Core MVC](https://dotnet.microsoft.com/apps/aspnet/mvc)
- [Vite.js](https://vitejs.dev/)
- [AdminLTE](https://adminlte.io/)
- [Node.js (para o Vite)](https://nodejs.org/)

# 🚀 Objetivo

Oferecer um ponto de partida simples e funcional para quem deseja utilizar um frontend moderno (com build otimizado, HMR, etc.) em projetos ASP.NET Core MVC tradicionais.

# 📦 Estrutura do projeto

# ⚙️ Como rodar o projeto

- Clone este repositório
- Instale as dependências do frontend:
```bash 
    cd ClientApp
    npm install
```
Inicie o Vite em modo de desenvolvimento:
```bash
  npm run dev
```

No terminal raiz, rode o backend:
```bash
  dotnet run
```

Acesse o projeto em https://localhost:5001

# 📌 Notas

O build de produção do Vite será colocado automaticamente em wwwroot.
AdminLTE foi integrado via arquivos estáticos e pode ser customizado conforme necessário.

# 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.