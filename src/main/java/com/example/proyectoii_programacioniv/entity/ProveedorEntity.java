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
@Table(name = "proveedor", schema = "proyecto2_progra4", catalog = "")
public class ProveedorEntity implements Serializable {
    @Id
    @Column(name = "id_proveedor")
    private String id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "correo_electronico")
    private String correo;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "clave")
    private String contrasena;

    @Column(name = "estado")
    private String estado;

    @Column(name = "ubicacion")
    private String ubicacion;

    @Column(name = "nombre_comercial")
    private String nomComercial;

    @Column(name = "tipo_identificacion")
    private String tipoId;

    @Column(name = "id_actividad_comercial")
    private int idActComercial;
}
