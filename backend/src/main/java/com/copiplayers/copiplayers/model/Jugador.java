package com.fpdual.baloncesto.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
@Entity
public class Jugador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;
    @NotBlank(message = "La posición es obligatoria")
    private String posicion;
    @NotNull(message = "El dorsal es obligatorio")
    private Integer dorsal;
    private Double altura;
    @ManyToOne
    @JoinColumn(name = "equipo_id", nullable = false)
    @JsonBackReference
    private Equipo equipo;
    // Campo auxiliar para recibir el ID del equipo en el JSON
    @Transient
    private Long equipoId;
    // Constructores
    public Jugador() {}
    public Jugador(String nombre, String posicion, Integer dorsal, Double altura) {
        this.nombre = nombre;
        this.posicion = posicion;
        this.dorsal = dorsal;
        this.altura = altura;
    }
    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getPosicion() { return posicion; }
    public void setPosicion(String posicion) { this.posicion = posicion; }
    public Integer getDorsal() { return dorsal; }
    public void setDorsal(Integer dorsal) { this.dorsal = dorsal; }
    public Double getAltura() { return altura; }
    public void setAltura(Double altura) { this.altura = altura; }
    public Equipo getEquipo() { return equipo; }
    public void setEquipo(Equipo equipo) { this.equipo = equipo; }
    public Long getEquipoId() { return equipoId; }
    public void setEquipoId(Long equipoId) { this.equipoId = equipoId; }
}