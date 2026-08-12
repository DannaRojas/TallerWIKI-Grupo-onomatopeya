# Devwiki · Grupo ONOMATOPEYA

Wiki técnica construida con Java 17, Spring Boot, Thymeleaf, HTML, CSS y JavaScript.

## Estructura sencilla

```text
Usuario → WikiController → PaginaWiki → pagina.html
```

- `controller`: recibe la visita a `/` y abre la plantilla.
- `model`: guarda el nombre de la wiki y del grupo.
- `templates`: contiene el HTML procesado por Thymeleaf.
- `static/css`: contiene el diseño visual.
- `static/js`: contiene la navegación y la validación del formulario.

No utilizamos una capa `Service` en esta primera versión.

## Ejecutar

En Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Después abre `http://localhost:8080`.
