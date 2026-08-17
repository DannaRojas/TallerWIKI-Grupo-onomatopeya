package co.edu.javeriana.onomatopeya.wikitaller.Controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HistoriasController {

    @GetMapping("/historias")
    public String historias(Model model) {
        model.addAttribute("titulo", "Historias de usuario");
        model.addAttribute(
            "descripcion",
            "Historias de usuario del proyecto Editor y visualizador de procesos."
        );

        model.addAttribute("usuarios", List.of(
            "HU-01 · Registro de empresa",
            "HU-02 · Registro de usuario en empresa",
            "HU-03 · Inicio de sesión",
            "HU-29 · Asignar rol de administrador, editor o solo lectura",
            "HU-30 · Restringir la información según la empresa del usuario"
        ));

        model.addAttribute("procesos", List.of(
            "HU-04 · Crear proceso",
            "HU-05 · Editar proceso",
            "HU-06 · Eliminar proceso",
            "HU-07 · Consultar procesos",
            "HU-31 · Clasificar un proceso por categoría",
            "HU-32 · Guardar un proceso como borrador o publicarlo",
            "HU-33 · Buscar y filtrar procesos",
            "HU-34 · Desactivar un proceso sin eliminar su historial",
            "HU-35 · Consultar el historial de cambios de un proceso"
        ));

        model.addAttribute("modelado", List.of(
            "HU-08 · Crear actividad",
            "HU-09 · Editar actividad",
            "HU-10 · Eliminar actividad",
            "HU-11 · Crear arco",
            "HU-12 · Editar arco",
            "HU-13 · Eliminar arco",
            "HU-14 · Crear gateway",
            "HU-15 · Editar gateway",
            "HU-16 · Eliminar gateway",
            "HU-36 · Configurar gateway exclusivo, paralelo o inclusivo"
        ));

        model.addAttribute("roles", List.of(
            "HU-17 · Crear rol de proceso",
            "HU-18 · Editar rol de proceso",
            "HU-19 · Eliminar rol de proceso",
            "HU-20 · Consultar roles de proceso",
            "HU-37 · Evitar eliminar un rol que está siendo utilizado"
        ));

        model.addAttribute("pools", List.of(
            "HU-21 · Configurar pool por empresa",
            "HU-22 · Diferenciar pool y lane (swimlane)",
            "HU-23 · Compartir procesos entre pools (alcance y límites)",
            "HU-24 · Asociar roles y permisos a un pool",
            "HU-38 · Asociar cada actividad a una lane y evitar arcos entre pools"
        ));

        model.addAttribute("mensajes", List.of(
            "HU-25 · Enviar mensaje entre procesos (Message Throw)",
            "HU-26 · Envío de notificaciones externas (mensaje a sistema externo)",
            "HU-27 · Recibir mensaje y activar proceso (Message Catch)",
            "HU-28 · Correlación de mensajes con instancias de proceso"
        ));

        return "historias";
    }
}
