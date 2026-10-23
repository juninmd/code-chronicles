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
