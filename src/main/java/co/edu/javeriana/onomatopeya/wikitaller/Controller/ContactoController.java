package co.edu.javeriana.onomatopeya.wikitaller.Controller;

import co.edu.javeriana.onomatopeya.wikitaller.model.MensajeContacto;
import co.edu.javeriana.onomatopeya.wikitaller.repositorio.MensajeContactoRepositorio;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ContactoController {

    private final MensajeContactoRepositorio repositorio;

    public ContactoController(MensajeContactoRepositorio repositorio) {
        this.repositorio = repositorio;
    }

    @GetMapping("/contacto")
    public String mostrarContacto() {
        return "contacto";
    }

    @PostMapping("/contacto")
public String guardarContacto(@ModelAttribute MensajeContacto mensaje,
                              RedirectAttributes atributos) {

    System.out.println("ENTRO AL CONTROLADOR: " + mensaje.getNombre());

    repositorio.save(mensaje);

    atributos.addFlashAttribute(
            "mensajeExito",
            "Tu mensaje fue enviado y guardado correctamente."
    );

    return "redirect:/contacto";
}
}