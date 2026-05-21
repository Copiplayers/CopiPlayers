package com.fpdual.baloncesto.model;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
@Entity
public class Equipo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    @NotBlank(message = "La ciudad es obligatoria")
    private String ciudad;
    private String conferencia;
    @NotNull(message = "El año de fundación es obligatorio")
    private Integer anioFundacion;
    @OneToMany(mappedBy = "equipo", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Jugador> jugadores = new ArrayList<>();
    // Constructores
    public Equipo() {}
    public Equipo(String nombre, String ciudad, String conferencia, Integer anioFundacion) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.conferencia = conferencia;
        this.anioFundacion = anioFundacion;
    }
    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getCiudad() { return ciudad; }
    public void setCiudad(String ciudad) { this.ciudad = ciudad; }
    public String getConferencia() { return conferencia; }
    public void setConferencia(String conferencia) { this.conferencia = conferencia; }
    public Integer getAnioFundacion() { return anioFundacion; }
    public void setAnioFundacion(Integer anioFundacion) { this.anioFundacion = anioFundacion; }
    public List<Jugador> getJugadores() { return jugadores; }
    public void setJugadores(List<Jugador> jugadores) { this.jugadores = jugadores; }
}