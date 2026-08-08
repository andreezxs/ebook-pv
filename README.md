# Tramas ocultas: vozes da vida

## Executar localmente

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Popular os capítulos no Supabase

1. Defina as variáveis de ambiente do Supabase:

```sh
set SUPABASE_URL="https://seu-projeto.supabase.co"
set SUPABASE_SERVICE_ROLE_KEY="sua-service-role-key"
```

2. Execute o seed:

```sh
node scripts/seed-chapters.mjs
```

O script insere ou atualiza os capítulos na tabela `public.chapters` usando os campos já consumidos pela aplicação.

