// 1. Aquí guardamos el texto que cambia en cada sección.
const secciones = {
  inicio: {
    numero: "00",
    titulo: "Ideas que hacen<br><em>¡clic!</em>",
    resumen: "Un espacio para documentar cómo construimos y explicamos nuestro proyecto.",
    puntos: ["Spring Boot", "Thymeleaf", "Arquitectura MVC"],
    pie: "Documentación clara, navegación simple y contenido dinámico."
  },
  arquitectura: {
    numero: "01",
    titulo: "Cada pieza<br><em>en su lugar.</em>",
    resumen: "Explicaremos cómo se conectan el modelo, el controlador y las vistas.",
    puntos: ["Modelo", "Controlador", "Vista"],
    pie: "Sección reservada para la arquitectura del sistema."
  },
  instalacion: {
    numero: "02",
    titulo: "De cero a<br><em>funcionando.</em>",
    resumen: "Requisitos y pasos necesarios para ejecutar Devwiki.",
    puntos: ["Java 17", "Maven", "Puerto 8080"],
    pie: "Sección reservada para la guía de instalación."
  },
  vistas: {
    numero: "03",
    titulo: "Una interfaz,<br><em>muchas vistas.</em>",
    resumen: "Documentaremos la organización de las plantillas de la wiki.",
    puntos: ["Encabezado", "Menú", "Pie de página"],
    pie: "Sección reservada para explicar las vistas."
  },
  thymeleaf: {
    numero: "04",
    titulo: "Datos que se<br><em>ven.</em>",
    resumen: "Mostraremos cómo Thymeleaf conecta los datos de Java con el HTML.",
    puntos: ["th:text", "th:href", "Modelo"],
    pie: "Sección reservada para aprender Thymeleaf."
  }
};

// 2. Guardamos los elementos que vamos a utilizar varias veces.
const contenido = document.querySelector("#contenido");
const informacion = document.querySelector("#informacion");
const contacto = document.querySelector("#contacto");
const botones = document.querySelectorAll(".boton");

// 3. Esta función cambia la sección visible.
function mostrarSeccion(nombre) {
  const seccion = nombre === "contacto" || secciones[nombre] ? nombre : "inicio";
  const esContacto = seccion === "contacto";
  const datos = secciones[seccion] || secciones.inicio;

  contenido.dataset.seccion = seccion;
  informacion.hidden = esContacto;
  contacto.hidden = !esContacto;

  botones.forEach((boton) => {
    boton.classList.toggle("activo", boton.dataset.seccion === seccion);
  });

  if (!esContacto) {
    document.querySelector("#numero").textContent = datos.numero;
    document.querySelector("#titulo").innerHTML = datos.titulo;
    document.querySelector("#resumen").textContent = datos.resumen;
    document.querySelector("#puntos").innerHTML = datos.puntos
      .map((punto) => `<li>${punto}</li>`)
      .join("");
    document.querySelector("#texto-pie").textContent = datos.pie;
  } else {
    document.querySelector("#texto-pie").textContent = "Formulario preparado para una futura conexión con el backend.";
  }

  history.replaceState(null, "", `#${seccion}`);
}

botones.forEach((boton) => {
  boton.addEventListener("click", () => mostrarSeccion(boton.dataset.seccion));
});

mostrarSeccion(location.hash.slice(1) || "inicio");

// 4. Validación sencilla de los cinco campos del formulario.
const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector("#mensaje");
const contador = document.querySelector("#contador");

const reglas = {
  nombre: (valor) => valor.trim().length >= 3 ? "" : "Escribe al menos 3 caracteres.",
  correo: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) ? "" : "Escribe un correo válido.",
  telefono: (valor) => /^\d{7,15}$/.test(valor) ? "" : "Usa entre 7 y 15 números.",
  asunto: (valor) => valor ? "" : "Selecciona un motivo.",
  mensaje: (valor) => valor.trim().length >= 20 ? "" : "Escribe mínimo 20 caracteres."
};

function validarCampo(campo) {
  const error = reglas[campo.name](campo.value);
  campo.setAttribute("aria-invalid", Boolean(error));
  document.querySelector(`#error-${campo.name}`).textContent = error;
  return error === "";
}

mensaje.addEventListener("input", () => {
  contador.textContent = `${mensaje.value.length}/400`;
});

formulario.querySelectorAll("input, select, textarea").forEach((campo) => {
  campo.addEventListener("blur", () => validarCampo(campo));
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const campos = formulario.querySelectorAll("input, select, textarea");
  const formularioCorrecto = [...campos].map(validarCampo).every(Boolean);
  const estado = document.querySelector("#estado");

  estado.textContent = formularioCorrecto
    ? "Todo está listo para enviar."
    : "Revisa los campos señalados.";
  estado.classList.toggle("correcto", formularioCorrecto);
});
