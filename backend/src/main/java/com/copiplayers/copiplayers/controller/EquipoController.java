package com.fpdual.baloncesto.controller;
import com.fpdual.baloncesto.model.Equipo;
import com.fpdual.baloncesto.model.Jugador;
import com.fpdual.baloncesto.service.EquipoService;
import com.fpdual.baloncesto.service.JugadorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/equipos")
public class EquipoController {
    private final EquipoService equipoService;
    private final JugadorService jugadorService;
    public EquipoController(EquipoService equipoService, JugadorService jugadorService) {
        this.equipoService = equipoService;
        this.jugadorService = jugadorService;
    }
    // Listar todos los equipos
    @GetMapping
    public List<Equipo> getAll() {
        return equipoService.findAll();
    }
    // Ver detalle de un equipo (con sus jugadores)
    @GetMapping("/{id}")
    public ResponseEntity<Equipo> getById(@PathVariable Long id) {
        return equipoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // Crear un equipo
    @PostMapping
    public Equipo create(@Valid @RequestBody Equipo equipo) {
        return equipoService.save(equipo);
    }
    // Consultar jugadores de un equipo (relación 1:M)
    @GetMapping("/{id}/jugadores")
    public ResponseEntity<List<Jugador>> getJugadoresByEquipo(@PathVariable Long id) {
        if (equipoService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(jugadorService.findByEquipoId(id));
    }
}