# Code Chronicles

![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)
![Node](https://img.shields.io/badge/Node-%3E=20-339933?logo=nodedotjs)
![License](https://img.shields.io/badge/License-ISC-blue)

CLI que percorre um diretório com vários repositórios Git, lista os commits dos últimos N dias de cada um e gera um único relatório em Markdown (`CODE_CHRONICLES_REPORT.md`). Útil para quem mantém vários projetos ou microserviços em paralelo.

## Requisitos

- Node.js 20 ou superior (versão usada no CI)
- `git` disponível no `PATH`

## Instalação

```bash
npm install
npm run build
npm link  # opcional: expõe o comando `code-chronicles` globalmente
```

## Configuração

Não há variáveis de ambiente nem arquivos de configuração. Todo o comportamento é controlado por flags.

## Uso

```bash
code-chronicles generate -d <diretorio-com-repos> -p 7
# sem npm link:
node ./dist/index.js generate -d <diretorio-com-repos> -p 7
# ou, usando o diretório atual e 7 dias:
npm start
```

| Flag | Descrição | Padrão |
|---|---|---|
| `-d, --dir <diretório>` | Diretório raiz; cada subpasta direta com `.git` é um repositório | diretório atual |
| `-p, --period <dias>` | Quantos dias olhar para trás | `7` |

- Só subpastas diretas de `--dir` são varridas (sem recursão).
- O relatório é gravado em `CODE_CHRONICLES_REPORT.md` no diretório **atual** (cwd), não em `--dir`. O arquivo está no `.gitignore`.
- Repositórios sem commits no período, ou em que o `git log` falha, são omitidos do relatório sem aviso.

Exemplo de saída real (`--help`, execução e relatório): [docs/terminal.txt](docs/terminal.txt). Os caminhos locais foram substituídos por placeholders e o repositório do exemplo é fabricado.

## Testes

Ainda não há testes: `npm test` apenas falha com a mensagem "no test specified".

## Lint

Não há linter configurado no projeto.

## Build

```bash
npm run build   # tsc: src/ -> dist/
```

## Gates de CI

| Workflow | Quando roda | O que checa |
|---|---|---|
| `Validate` (`validate.yml`) | PRs e push em `master` | Gate reutilizável `juninmd/base-actions` (`reusable-validate.yml`): instalação, verificações do projeto e auditoria de dependências |
| `Build` (`build.yml`) | PRs para `main`/`master` | Node 20, `npm ci` (ou `npm install`) e `npm run build` |
| `Security Scan` (`security.yml`) | push em `master`, semanal (domingo 00:00 UTC) e manual | Varredura de segredos (Gitleaks) via `reusable-security-scan.yml` |

## Licença

ISC
