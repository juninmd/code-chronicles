# AGENTS.md

## Stack
- TypeScript 6 (strict), saída CommonJS (`tsconfig.json`: `rootDir ./src`, `outDir ./dist`)
- Node.js 20+ (CI usa 20 no Build e 22 no Validate)
- Commander 15 para parsing de argumentos
- npm (`package-lock.json`)

## Estrutura
- `src/index.ts`: CLI inteiro (comando `generate`); `bin` aponta para `dist/index.js`
- `dist/`: saída do `tsc` (ignorada no git)

## Comandos
- `npm ci` instala dependências
- `npm run build` compila com `tsc`
- `npm start` roda `node ./dist/index.js generate` (precisa do build antes)
- `npm test` não tem testes (falha de propósito: "no test specified")
- Não há linter configurado

## Gates de CI
- `Validate`: `juninmd/base-actions` reusable-validate (PRs e push em `master`)
- `Build`: `npm run build` em Node 20 (PRs)
- `Security Scan`: Gitleaks (push em `master`, semanal, manual)

## Não fazer
- Não commitar `dist/` nem `CODE_CHRONICLES_REPORT.md` (ambos no `.gitignore`)
- Não interpolar entrada do usuário em comandos de shell sem validar (o `git log` usa `execSync` com string)
- Não editar `package-lock.json` à mão

<!-- base-actions-main-policy -->
## GitHub Actions — padrão obrigatório (@main)

- Referencie as actions internas sempre pelo branch, nunca por SHA:
  - `uses: juninmd/base-actions/<action>@main`
  - `uses: juninmd/base-actions/.github/workflows/<arquivo>.yml@main`
- Não fixe `@<sha>` em `juninmd/base-actions`: a atualização é centralizada no
  `main` e passa a valer no próximo run.
- PRs cujos checks não iniciam por billing/spending limit são mesclados pelo bot central
  `juninmd/base-actions/.github/workflows/auto-merge-billing-blocked.yml`.
  Para impedir o merge automático de um PR, aplique a label `do-not-merge`.