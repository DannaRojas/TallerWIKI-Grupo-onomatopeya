package co.edu.javeriana.onomatopeya.wikitaller.controller;

import co.edu.javeriana.onomatopeya.wikitaller.model.PaginaWiki;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WikiController {

    @GetMapping("/")
    public String mostrarWiki(Model model) {
        PaginaWiki wiki = new PaginaWiki("Devwiki", "ONOMATOPEYA");
        model.addAttribute("wiki", wiki);
        return "pagina";
    }
}
