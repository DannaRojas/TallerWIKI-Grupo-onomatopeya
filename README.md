# DevWiki — Grupo Onomatopeya

DevWiki es la Wiki técnica construida por el grupo Onomatopeya para el curso de Desarrollo Web. En ella se documenta el avance del proyecto semestral: un Sistema de Gestión de Procesos que permitirá a cada empresa organizar y modelar sus procesos.

La aplicación actual no ejecuta procesos reales. Su propósito en esta entrega es presentar la información del proyecto mediante vistas dinámicas con Spring Boot y Thymeleaf, además de incluir un formulario de contacto conectado a una base de datos local.

## Qué se realizó

- Wiki con las secciones Inicio, Arquitectura, Historias de usuario y Contáctanos.
- Navegación consistente entre las páginas.
- Uso de Thymeleaf para mostrar datos dinámicos con `th:text`, `th:each`, `th:if`, `th:href`, `th:src` y `th:action`.
- Aplicación del patrón MVC: controladores, vistas y modelo separados.
- Formulario de contacto con validaciones en HTML y JavaScript.
- Persistencia de los mensajes de contacto en H2.
- Estilos CSS propios y diseño común en las vistas.
- Dockerfile para ejecutar la aplicación en un contenedor.

## Tecnologías

- Java 17
- Spring Boot 4
- Maven Wrapper
- Thymeleaf
- Spring Data JPA
- H2 Database
- HTML, CSS y JavaScript
- Docker

## Rutas disponibles

| Ruta | Descripción |
| --- | --- |
| `/` | Página principal de la Wiki y presentación del grupo. |
| `/arquitectura` | Explica la estructura y el patrón MVC del proyecto. |
| `/historias` | Muestra las historias de usuario del sistema. |
| `/contacto` | Formulario de contacto. Al enviarlo, el mensaje se guarda en H2. |
| `/h2-console` | Consola local para consultar la base de datos H2. |

## Estructura del proyecto en Visual Studio Code

```text
TallerWIKI-Grupo-onomatopeya/
├── src/
│   ├── main/
│   │   ├── java/co/edu/javeriana/onomatopeya/wikitaller/
│   │   │   ├── Controller/       Controladores de las rutas web
│   │   │   ├── model/            Clases del modelo y entidades JPA
│   │   │   ├── repositorio/      Interfaces para consultar y guardar datos
│   │   │   └── WikitallerApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/          Estilos de la aplicación
│   │       │   ├── images/       Imágenes de la Wiki y del equipo
│   │       │   └── js/           Validaciones del formulario
│   │       ├── templates/        Vistas HTML procesadas por Thymeleaf
│   │       └── application.properties
│   └── test/                     Pruebas de la aplicación
├── data/                         Archivo local de la base de datos H2
├── Dockerfile                    Instrucciones para construir el contenedor
├── pom.xml                       Dependencias y configuración de Maven
├── mvnw / mvnw.cmd               Maven Wrapper
└── README.md
```

## Arquitectura MVC

La aplicación usa el patrón Modelo–Vista–Controlador:

1. El usuario abre una ruta, por ejemplo, `/contacto`.
2. Spring Boot encuentra el controlador que tiene esa ruta.
3. El controlador prepara los datos o recibe el formulario.
4. El modelo representa los datos del sistema, por ejemplo `MensajeContacto`.
5. Thymeleaf procesa la vista HTML de `templates`.
6. El navegador recibe y muestra la página terminada.

Controladores principales:

- `InicioController`: muestra la página inicial.
- `ArquitecturaController`: muestra la documentación de arquitectura.
- `HistoriasController`: entrega las listas que se muestran con `th:each`.
- `ContactoController`: muestra y guarda el formulario de contacto.

## Ejecutar el proyecto localmente

### Requisitos

- Tener Java 17 instalado.
- Abrir la carpeta raíz del repositorio en Visual Studio Code.

### Paso a paso

En la terminal de Visual Studio Code, ubicada en la carpeta del proyecto, ejecuta:

```powershell
.\mvnw.cmd spring-boot:run
```

Espera el mensaje similar a:

```text
Tomcat started on port 8080
```

Luego abre en el navegador:

```text
http://localhost:8080/
```

Para detener la aplicación, vuelve a la terminal y presiona `Ctrl + C`.

## H2: base de datos local

H2 es una base de datos liviana que se usa durante el desarrollo. En este proyecto se guarda localmente en la carpeta `data/` mediante esta configuración:

```properties
spring.datasource.url=jdbc:h2:file:./data/devwiki;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```

`ddl-auto=update` permite que Hibernate cree o actualice las tablas a partir de las entidades Java. La entidad `MensajeContacto` genera la tabla `MENSAJES_CONTACTO`.

### Consultar H2 paso a paso

1. Inicia la aplicación con Maven.
2. Abre `http://localhost:8080/h2-console`.
3. En **JDBC URL** escribe:

   ```text
   jdbc:h2:file:./data/devwiki;DB_CLOSE_ON_EXIT=FALSE
   ```

4. En **User Name** escribe `sa`.
5. Deja vacía la contraseña.
6. Pulsa **Connect**.
7. Para ver los mensajes registrados, ejecuta:

   ```sql
   SELECT * FROM MENSAJES_CONTACTO;
   ```

## Cómo funciona el formulario de contacto

1. El usuario entra a `/contacto`.
2. Completa nombre, correo, teléfono, asunto y mensaje.
3. HTML y `contacto-validacion.js` revisan que los campos estén completos.
4. El formulario envía una solicitud `POST` a `/contacto`.
5. `ContactoController` recibe los datos con `@ModelAttribute MensajeContacto`.
6. `MensajeContactoRepositorio`, que extiende `JpaRepository`, ejecuta `save(mensaje)`.
7. JPA guarda el mensaje en H2, dentro de `MENSAJES_CONTACTO`.
8. El controlador redirige a `/contacto` y muestra un mensaje de confirmación con `th:if`.

## Docker

Docker permite ejecutar la aplicación dentro de un contenedor, con Java y las dependencias necesarias, sin configurar todo el entorno manualmente en cada computador.

El `Dockerfile` usa dos etapas:

1. **Build:** usa `eclipse-temurin:17-jdk`, descarga dependencias y genera el archivo `.jar` con Maven.
2. **Runtime:** usa una imagen más ligera (`eclipse-temurin:17-jre`), copia el `.jar` generado y ejecuta la aplicación en el puerto 8080.

### Construir y ejecutar con Docker

Con Docker Desktop abierto, desde la raíz del proyecto ejecuta:

```powershell
docker build -t devwiki .
docker run --name devwiki -p 8080:8080 devwiki
```

Después abre:

```text
http://localhost:8080/
```

Para detener el contenedor:

```powershell
docker stop devwiki
```

Para iniciarlo de nuevo:

```powershell
docker start devwiki
```

## Trabajo con Git

Antes de traer cambios de `main`, revisa el estado:

```powershell
git status
git pull origin main
```

Para enviar cambios propios a `main`:

```powershell
git add nombre-del-archivo
git commit -m "Descripción breve del cambio"
git push origin main
```

Si tienes cambios locales que aún no deseas confirmar y necesitas actualizarte, puedes protegerlos temporalmente:

```powershell
git stash push -u -m "Cambios locales temporales"
git pull origin main
git stash pop
```

## Grupo Onomatopeya

| Integrante | Rol principal |
| --- | --- |
| Danna Gabriela Rojas Bernal | Liderazgo del equipo y Backend |
| Sebastián Peralta | Pruebas de calidad (QA) y Desarrollo |
| María Camila Ariza Gamboa | Docker, contenedorización y despliegue |
| Laura Valentina Ladino Rivera | Formulario de contacto, Frontend y Backend |

