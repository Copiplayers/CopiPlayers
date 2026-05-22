package com.copiplayers.copiplayers.service;
import com.copiplayers.copiplayers.model.Equipo;
import com.copiplayers.copiplayers.repository.EquipoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service
public class EquipoService {
    private final EquipoRepository equipoRepository;
    public EquipoService(EquipoRepository equipoRepository) {
        this.equipoRepository = equipoRepository;
    }
    public List<Equipo> findAll() {
        return equipoRepository.findAll();
    }
    public Optional<Equipo> findById(Long id) {
        return equipoRepository.findById(id);
    }
    public Equipo save(Equipo equipo) {
        return equipoRepository.save(equipo);
    }
    public void deleteById(Long id) {
        equipoRepository.deleteById(id);
    }
}