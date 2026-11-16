#!/usr/bin/env bash
# Compila ComPDF igual que el workflow de GitHub Pages (ejecutar con Git Bash en Windows).
set -euo pipefail
cd "$(dirname "$0")"

export MSYS_NO_PATHCONV=1 MSYS2_ENV_CONV_EXCL='*'   # evita que Git Bash convierta /ComPDF/ en una ruta de Windows
export SIMPLE_MODE=true BASE_URL=/ComPDF/ HUSKY=0
set -a && . ./.env.production && set +a

if command -v cygpath >/dev/null 2>&1; then
  export npm_config_script_shell="$(cygpath -w "$(command -v bash)")"   # npm en Windows usa cmd por defecto
fi

[ -d node_modules ] || npm ci --ignore-scripts
npm run build
echo "Listo: carpeta dist/ (sírvela en /ComPDF/ para probarla)"
