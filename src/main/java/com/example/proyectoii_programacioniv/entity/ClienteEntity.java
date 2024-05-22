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
@Table(name = "cliente", schema = "proyecto2_progra4", catalog = "")
public class ClienteEntity implements Serializable {
    @Id
    @Column(name = "id_cliente")
    private String id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "correo_electronico")
    private String correo;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "tipo_identificacion")
    private String tipoId;
}
