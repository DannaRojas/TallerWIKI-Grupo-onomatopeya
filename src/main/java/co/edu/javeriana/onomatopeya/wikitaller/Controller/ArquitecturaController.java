package co.edu.javeriana.onomatopeya.wikitaller.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ArquitecturaController {

    @GetMapping("/arquitectura")
    public String arquitectura(Model model) {
        model.addAttribute("titulo", "Arquitectura");
        model.addAttribute(
            "descripcion",
            "Organización principal de DevWiki y herramientas usadas en el proyecto."
        );

        return "arquitectura";
    }
}
