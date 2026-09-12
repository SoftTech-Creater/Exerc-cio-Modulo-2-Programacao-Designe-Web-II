# Exercício 2 - Servidor de Arquivos - Módulo 2 - Programação e Design Web II

Servidor HTTP criado com o módulo nativo `http`, que serve arquivos estáticos da pasta `public/`, identificando o `Content-Type` correto de cada arquivo através de um mapa de extensões (`MIME`), e respondendo com uma página 404 personalizada quando o arquivo não é encontrado.

## Requisitos

- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior recomendada)

## Como rodar

```bash
cd "Servidor de Arquivos"
node server.js
```

Depois acesse **http://localhost:3000** no navegador. Para ver a página 404 personalizada, acesse um caminho que não exista, como **http://localhost:3000/nao-existe**.

Não é necessário instalar nenhuma dependência (`npm install`) — o projeto usa apenas módulos nativos do Node.js (`http`, `path`, `fs/promises`).
