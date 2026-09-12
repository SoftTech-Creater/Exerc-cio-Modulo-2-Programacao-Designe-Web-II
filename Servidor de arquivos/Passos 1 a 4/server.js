#!/usr/bin/env node

/**
 * Exercício 2 - Servidor de Arquivos (versão completa)
 *
 * Passo 1: Servidor com o módulo nativo http.
 * Passo 2: Objeto MIME relacionando extensão -> Content-Type.
 * Passo 3: Montar o caminho completo do arquivo dentro de public/.
 * Passo 4: Ler o arquivo e responder com o Content-Type certo,
 *          ou 404 personalizado se não existir.
 */

const http = require('http');
const { join, extname } = require('path');
const { readFile } = require('fs/promises');

// Passo 2: mapa de extensão -> Content-Type
const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
};

const PASTA_PUBLIC = join(process.cwd(), "public");

const servidor = http.createServer(async (req, res) => {
  // Passo 3: montar o caminho completo do arquivo dentro de public/
  const url = req.url === "/" ? "/index.html" : req.url;
  const filePath = join(PASTA_PUBLIC, url);

  // Proteção extra: impede acessar arquivos fora da pasta public/ (ex: ../server.js)
  if (!filePath.startsWith(PASTA_PUBLIC)) {
    res.writeHead(403, { "Content-Type": "text/plain" });
    res.end("403 -- Acesso negado");
    return;
  }

  // Passo 4: tentar ler o arquivo e responder com o Content-Type certo,
  // ou 404 personalizado se o arquivo não existir
  try {
    const content = await readFile(filePath);
    const ext = extname(filePath);
    const mime = MIME[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": mime });
    res.end(content);
  } catch {
    try {
      // Tenta servir a página 404.html personalizada
      const pagina404 = await readFile(join(PASTA_PUBLIC, "404.html"));
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(pagina404);
    } catch {
      // Se nem o 404.html existir, manda texto simples de reserva
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 -- Arquivo nao encontrado");
    }
  }
});

const PORTA = 3000;
servidor.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
