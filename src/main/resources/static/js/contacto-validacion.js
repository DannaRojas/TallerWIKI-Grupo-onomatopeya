/**
 * El formulario no envía datos a ningún backend todavía.
 */

(function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const fields = {
        nombre: document.getElementById('nombre'),
        correo: document.getElementById('correo'),
        telefono: document.getElementById('telefono'),
        asunto: document.getElementById('asunto'),
        mensaje: document.getElementById('mensaje'),
    };

    const errorEls = {
        nombre: document.getElementById('error-nombre'),
        correo: document.getElementById('error-correo'),
        telefono: document.getElementById('error-telefono'),
        asunto: document.getElementById('error-asunto'),
        mensaje: document.getElementById('error-mensaje'),
    };

    const counter = document.getElementById('counter-mensaje');
    const feedback = document.getElementById('form-feedback');

    const MENSAJE_MIN = 20;
    const MENSAJE_MAX = 400;

    const validators = {
        nombre: (value) => {
            const trimmed = value.trim();
            if (trimmed.length === 0) return 'El nombre es obligatorio.';
            if (trimmed.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
            return null;
        },
        correo: (value) => {
            const trimmed = value.trim();
            if (trimmed.length === 0) return 'El correo electrónico es obligatorio.';
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!pattern.test(trimmed)) return 'Ingresa un correo válido, por ejemplo nombre@dominio.com.';
            return null;
        },
        telefono: (value) => {
            const trimmed = value.trim();
            if (trimmed.length === 0) return 'El teléfono es obligatorio.';
            if (!/^\d+$/.test(trimmed)) return 'El teléfono solo debe contener números.';
            if (trimmed.length < 7 || trimmed.length > 15) return 'El teléfono debe tener entre 7 y 15 dígitos.';
            return null;
        },
        asunto: (value) => {
            if (!value) return 'Selecciona un asunto o motivo de contacto.';
            return null;
        },
        mensaje: (value) => {
            const trimmed = value.trim();
            if (trimmed.length === 0) return 'El mensaje es obligatorio.';
            if (trimmed.length < MENSAJE_MIN) {
                const faltan = MENSAJE_MIN - trimmed.length;
                return `Escribe al menos ${MENSAJE_MIN} caracteres. Te faltan ${faltan}.`;
            }
            if (trimmed.length > MENSAJE_MAX) return `El mensaje no puede superar ${MENSAJE_MAX} caracteres.`;
            return null;
        },
    };

    function setFieldState(name, errorMessage) {
        const wrapper = fields[name].closest('.field');
        errorEls[name].textContent = errorMessage || '';
        wrapper.classList.toggle('has-error', Boolean(errorMessage));
        wrapper.classList.toggle('is-valid', !errorMessage && fields[name].value.trim().length > 0);
        return !errorMessage;
    }

    function validateField(name) {
        const value = fields[name].value;
        const error = validators[name](value);
        return setFieldState(name, error);
    }

    function updateCounter() {
        const len = fields.mensaje.value.trim().length;
        if (len < MENSAJE_MIN) {
            counter.textContent = `${len} / ${MENSAJE_MAX} caracteres · faltan ${MENSAJE_MIN - len}`;
        } else {
            counter.textContent = `${len} / ${MENSAJE_MAX} caracteres`;
        }
    }

    Object.keys(fields).forEach((name) => {
        fields[name].addEventListener('input', () => {
            if (name === 'mensaje') updateCounter();
            validateField(name);
        });
        fields[name].addEventListener('blur', () => validateField(name));
    });

    function handleSubmit(event) {
        event.preventDefault();

        const results = Object.keys(fields).map((name) => validateField(name));
        const isValid = results.every(Boolean);

        if (!isValid) {
            feedback.textContent = 'Revisa los campos marcados en rojo antes de enviar el formulario.';
            feedback.className = 'form__feedback error';
            return;
        }

        // --- Punto de integración futura con backend ---

        feedback.textContent = '¡Listo! Tu información es válida y está lista para enviarse.';
        feedback.className = 'form__feedback success';
        form.reset();
        Object.keys(fields).forEach((name) => setFieldState(name, null));
        updateCounter();
    }

    form.addEventListener('submit', handleSubmit);
    updateCounter();
})();
