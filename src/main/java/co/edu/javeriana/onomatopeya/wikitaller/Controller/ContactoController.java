package co.edu.javeriana.onomatopeya.wikitaller.Controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ContactoController {
    @GetMapping("/contacto")
    public String getContacto() {
        return "contacto";
    }
}
