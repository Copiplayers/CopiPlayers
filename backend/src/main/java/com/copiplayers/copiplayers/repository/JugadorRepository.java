package com.copiplayers.copiplayers.repository;

import com.copiplayers.copiplayers.model.Jugador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JugadorRepository extends JpaRepository<Jugador, Long> {

    // Añadimos esta consulta explícita para que Spring no intente adivinar el nombre del atributo
    @Query("SELECT j FROM Jugador j WHERE j.equipo.id = :equipoId")
    List<Jugador> findByEquipoId(@Param("equipoId") Long equipoId);
}