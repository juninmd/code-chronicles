# Code Chronicles

> CLI tool para gerar relatórios unificados de commits de múltiplos repositórios Git.

![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)
![Node](https://img.shields.io/badge/Node-%3E=18-339933?logo=nodedotjs)
![License](https://img.shields.io/badge/License-ISC-blue)

## Sobre

Ferramenta de linha de comando que percorre um diretório local contendo múltiplos repositórios Git, extrai o histórico de commits dos últimos N dias e gera um relatório unificado em Markdown. Perfeito para desenvolvedores que gerenciam múltiplos microserviços ou projetos paralelos.

## Instalação

```bash
npm install
npm run build
npm link  # (opcional, para usar globalmente)
```

## Uso

```bash
code-chronicles generate -d D:\Solutions\pessoal -p 7
```

## Opções

- `-d, --dir <diretório>`: Diretório raiz com os repositórios Git (padrão: diretório atual)
- `-p, --period <dias>`: Número de dias para olhar para trás (padrão: 7)

## Licença

ISC
