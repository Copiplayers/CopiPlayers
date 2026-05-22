package com.copiplayers.copiplayers.controller;
import com.copiplayers.copiplayers.model.Equipo;
import com.copiplayers.copiplayers.model.Jugador;
import com.copiplayers.copiplayers.service.EquipoService;
import com.copiplayers.copiplayers.service.JugadorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/jugadores")
@CrossOrigin(origins = "http://localhost:4200")
public class JugadorController {
    private final JugadorService jugadorService;
    private final EquipoService equipoService;
    public JugadorController(JugadorService jugadorService, EquipoService equipoService) {
        this.jugadorService = jugadorService;
        this.equipoService = equipoService;
    }
    // Listar todos los jugadores
    @GetMapping
    public List<Jugador> getAll() {
        return jugadorService.findAll();
    }
    // Ver detalle de un jugador
    @GetMapping("/{id}")
    public ResponseEntity<Jugador> getById(@PathVariable Long id) {
        return jugadorService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // Crear un jugador (recibe equipoId en el body)
    @PostMapping
    public ResponseEntity<Jugador> create(@Valid @RequestBody Jugador jugador) {
        System.out.println("=======> ID RECIBIDO DESDE ANGULAR: " + jugador.getEquipoId());
        Long idEquipoAAsociar = jugador.getEquipoId();

        // Salvavidas: Si equipoId es null pero por alguna razón viene un objeto equipo con ID...
        if (idEquipoAAsociar == null && jugador.getEquipo() != null) {
            idEquipoAAsociar = jugador.getEquipo().getId();
        }

        // Si después de verificar ambos sigue siendo null, mandamos un aviso descriptivo
        if (idEquipoAAsociar == null) {
            System.out.println("⚠️ ERROR: El ID del equipo llegó completamente vacío desde el Frontend.");
            return ResponseEntity.badRequest().build();
        }

        // Buscamos el equipo real en la base de datos
        Optional<Equipo> equipoOptional = equipoService.findById(idEquipoAAsociar);
        if (equipoOptional.isEmpty()) {
            System.out.println("⚠️ ERROR: El ID de equipo " + idEquipoAAsociar + " no existe en la BD.");
            return ResponseEntity.badRequest().build();
        }

        // Asignamos el equipo encontrado y guardamos
        jugador.setEquipo(equipoOptional.get());
        Jugador jugadorGuardado = jugadorService.save(jugador);
        
        return ResponseEntity.ok(jugadorGuardado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        // Verificamos si el jugador existe antes de intentar borrarlo
        if (!jugadorService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        
        jugadorService.deleteById(id);
        return ResponseEntity.noContent().build(); // Devuelve un estado 204 (Sin Contenido) que significa "Éxito"
    }

    
}