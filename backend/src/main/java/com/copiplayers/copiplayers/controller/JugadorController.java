package com.fpdual.baloncesto.controller;
import com.fpdual.baloncesto.model.Equipo;
import com.fpdual.baloncesto.model.Jugador;
import com.fpdual.baloncesto.service.EquipoService;
import com.fpdual.baloncesto.service.JugadorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/jugadores")
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
        if (jugador.getEquipoId() == null) {
            return ResponseEntity.badRequest().build();
        }
        Optional<Equipo> equipo = equipoService.findById(jugador.getEquipoId());
        if (equipo.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        jugador.setEquipo(equipo.get());
        return ResponseEntity.ok(jugadorService.save(jugador));
    }
}