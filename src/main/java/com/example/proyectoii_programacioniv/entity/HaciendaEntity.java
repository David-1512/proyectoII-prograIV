package com.example.proyectoii_programacioniv.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.Objects;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "hacienda", schema = "proyecto_prograiv", catalog = "")
public class HaciendaEntity implements Serializable {
    @Id
    @Column(name = "nif")
    private String nif;

    @Column(name = "act_economica")
    private String actEconomica;

    @OneToMany(mappedBy = "haciendaByNif")
    private Collection<ProveedorEntity> proveedorsByNif;
}
