/**
 * Validaciones del formulario antes de enviarlo a Spring Boot.
 */

(function () {
    const formulario = document.getElementById('contact-form');
    if (!formulario) return;

    const campos = {
        nombre: document.getElementById('nombre'),
        correo: document.getElementById('correo'),
        telefono: document.getElementById('telefono'),
        asunto: document.getElementById('asunto'),
        mensaje: document.getElementById('mensaje'),
    };

    const elementosError = {
        nombre: document.getElementById('error-nombre'),
        correo: document.getElementById('error-correo'),
        telefono: document.getElementById('error-telefono'),
        asunto: document.getElementById('error-asunto'),
        mensaje: document.getElementById('error-mensaje'),
    };

    const contador = document.getElementById('counter-mensaje');

    const MENSAJE_MINIMO = 20;
    const MENSAJE_MAXIMO = 400;

    const validadores = {
        nombre: (valor) => {
            const texto = valor.trim();

            if (texto.length === 0) {
                return 'El nombre es obligatorio.';
            }

            if (texto.length < 3) {
                return 'El nombre debe tener al menos 3 caracteres.';
            }

            return null;
        },

        correo: (valor) => {
            const texto = valor.trim();

            if (texto.length === 0) {
                return 'El correo electrónico es obligatorio.';
            }

            const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!patronCorreo.test(texto)) {
                return 'Ingresa un correo válido, por ejemplo nombre@dominio.com.';
            }

            return null;
        },

        telefono: (valor) => {
            const texto = valor.trim();

            if (texto.length === 0) {
                return 'El teléfono es obligatorio.';
            }

            if (!/^\d+$/.test(texto)) {
                return 'El teléfono solo debe contener números.';
            }

            if (texto.length < 7 || texto.length > 15) {
                return 'El teléfono debe tener entre 7 y 15 dígitos.';
            }

            return null;
        },

        asunto: (valor) => {
            if (!valor) {
                return 'Selecciona un asunto o motivo de contacto.';
            }

            return null;
        },

        mensaje: (valor) => {
            const texto = valor.trim();

            if (texto.length === 0) {
                return 'El mensaje es obligatorio.';
            }

            if (texto.length < MENSAJE_MINIMO) {
                const faltan = MENSAJE_MINIMO - texto.length;
                return `Escribe al menos ${MENSAJE_MINIMO} caracteres. Te faltan ${faltan}.`;
            }

            if (texto.length > MENSAJE_MAXIMO) {
                return `El mensaje no puede superar ${MENSAJE_MAXIMO} caracteres.`;
            }

            return null;
        },
    };

    function mostrarEstadoCampo(nombreCampo, mensajeError) {
        const contenedor = campos[nombreCampo].closest('.field');

        elementosError[nombreCampo].textContent = mensajeError || '';
        contenedor.classList.toggle('has-error', Boolean(mensajeError));
        contenedor.classList.toggle(
            'is-valid',
            !mensajeError && campos[nombreCampo].value.trim().length > 0
        );

        return !mensajeError;
    }

    function validarCampo(nombreCampo) {
        const valor = campos[nombreCampo].value;
        const mensajeError = validadores[nombreCampo](valor);

        return mostrarEstadoCampo(nombreCampo, mensajeError);
    }

    function actualizarContador() {
        const longitud = campos.mensaje.value.trim().length;

        if (longitud < MENSAJE_MINIMO) {
            contador.textContent =
                `${longitud} / ${MENSAJE_MAXIMO} caracteres · faltan ${MENSAJE_MINIMO - longitud}`;
        } else {
            contador.textContent = `${longitud} / ${MENSAJE_MAXIMO} caracteres`;
        }
    }

    Object.keys(campos).forEach((nombreCampo) => {
        campos[nombreCampo].addEventListener('input', () => {
            if (nombreCampo === 'mensaje') {
                actualizarContador();
            }

            validarCampo(nombreCampo);
        });

        campos[nombreCampo].addEventListener('blur', () => {
            validarCampo(nombreCampo);
        });
    });

    actualizarContador();
})();
