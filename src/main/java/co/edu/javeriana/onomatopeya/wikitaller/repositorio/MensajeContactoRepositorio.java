package co.edu.javeriana.onomatopeya.wikitaller.repositorio;

import co.edu.javeriana.onomatopeya.wikitaller.model.MensajeContacto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MensajeContactoRepositorio
        extends JpaRepository<MensajeContacto, Long> {
}