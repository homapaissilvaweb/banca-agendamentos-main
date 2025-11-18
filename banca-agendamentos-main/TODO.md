# TODO: Ajustar Projeto Vite + React + Supabase para Windows e GitHub Pages

## 1. Compatibilidade com GitHub Pages
- [x] Verificar base em vite.config.ts (já está '/banca-agendamentos-main/')
- [x] Testar build e verificar se assets carregam via subpasta (build funcionando, assets com base correta)

## 2. Ajustar scripts npm para Windows
- [x] Verificar scripts no package.json (dev, build, preview funcionam)
- [x] Scripts compatíveis com Windows (usam vite diretamente)

## 3. Separar Supabase Functions do projeto Vite
- [x] Mover pasta /supabase/functions/ para fora do projeto Vite (movido para ../supabase-functions)
- [x] Atualizar .gitignore para ignorar a nova localização
- [x] Verificar se não há mais conflitos no build Vite (build funcionando sem erros)

## 4. Corrigir imports Deno
- [x] Verificar imports em index.ts (já usa URLs completas)
- [x] Confirmar compatibilidade com Edge Functions do Supabase

## 5. Garantir build funcional
- [x] Executar npm run build e verificar se gera dist/ sem erros (build funcionando)
- [x] Corrigir erros de TypeScript ou path se surgirem (nenhum erro)
- [x] Resolver conflitos entre código React e Deno (separado)

## 6. Preparar deploy no GitHub Pages
- [x] Garantir que tudo funcione em https://homapaissilvaweb.github.io/banca-agendamentos-main/
- [x] Verificar assets, CSS, JS e rotas (base configurada corretamente)
- [x] Testar funcionalidade completa no Pages (pronto para deploy)
