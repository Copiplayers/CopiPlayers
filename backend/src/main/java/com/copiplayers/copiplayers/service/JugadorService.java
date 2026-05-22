package com.copiplayers.copiplayers.service;
import com.copiplayers.copiplayers.model.Jugador;
import com.copiplayers.copiplayers.repository.JugadorRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class JugadorService {
    private final JugadorRepository jugadorRepository;
    public JugadorService(JugadorRepository jugadorRepository) {
        this.jugadorRepository = jugadorRepository;
    }
    public List<Jugador> findAll() {
        return jugadorRepository.findAll();
    }
    public Optional<Jugador> findById(Long id) {
        return jugadorRepository.findById(id);
    }
    public List<Jugador> findByEquipoId(Long equipoId) {
        return jugadorRepository.findByEquipoId(equipoId);
    }
    public Jugador save(Jugador jugador) {
        return jugadorRepository.save(jugador);
    }
    public void deleteById(Long id) {
        jugadorRepository.deleteById(id);
    }
}