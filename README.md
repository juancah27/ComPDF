<p align="center"><img src="public/images/compdf-logo.svg" width="80"></p>
<h1 align="center">ComPDF</h1>
<p align="center">Herramientas PDF que se ejecutan 100 % en el navegador. Los archivos nunca salen de tu equipo.</p>

## Qué es

ComPDF es una versión adaptada de [BentoPDF](https://github.com/alam00000/bentopdf)
(commit `cc97429413ee13fa977d18627003b9b69e1787e6`, versión 2.8.11), con estos cambios:

- Marca **ComPDF** y español como idioma por defecto.
- **Modo simple**: solo herramientas, sin las secciones comerciales del sitio original.
- **Sin CDN externo**: los módulos WASM (PyMuPDF, Ghostscript, CoherentPDF) y el OCR
  (Tesseract, inglés y español) se sirven desde el propio sitio, en `public/wasm/`.
- Dependencias actualizadas con `npm audit fix`.
- Solo se conservan los workflows de GitHub Pages, tests y CodeQL.

Todo el procesamiento de los PDF ocurre en el navegador del usuario (JavaScript + WebAssembly).

## Sitio publicado

**https://juancah27.github.io/ComPDF/**

El workflow `Deploy static content to Pages` compila y publica el sitio en cada push a `main`
(`Settings → Pages → Source: GitHub Actions`).

Si el repositorio tiene otro nombre, cambia `BASE_URL` en `.github/workflows/static.yml`
y las rutas `/ComPDF/` de `.env.production`.

## Probar en local

Con Git Bash (en Windows también):

```bash
bash build-local.sh          # instala dependencias si faltan y compila en dist/
```

El sitio espera servirse bajo `/ComPDF/`. Para probarlo, sirve una carpeta que contenga
`ComPDF/` → `dist/` con cualquier servidor estático y abre `http://localhost:<puerto>/ComPDF/`.

## Licencia

ComPDF se distribuye bajo **GNU AGPL-3.0**, igual que BentoPDF (ver `LICENSE`).
Copyright del código original: BentoPDF y sus colaboradores. Se mantienen sus avisos de copyright y licencia.
Al publicar el sitio, el código fuente con todas las modificaciones debe seguir disponible
(este repositorio público lo cumple).

La documentación original está en [`README.bentopdf.md`](README.bentopdf.md).
