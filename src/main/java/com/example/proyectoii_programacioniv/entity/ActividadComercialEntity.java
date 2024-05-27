package com.example.proyectoii_programacioniv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "actividad_comercial", schema = "proyecto2_progra4", catalog = "")
public class ActividadComercialEntity {
    @Id
    @Column(name = "id_actividad_comercial")
    private String idActComercial;

    @Column(name = "nombre")
    private String nombre;

}
