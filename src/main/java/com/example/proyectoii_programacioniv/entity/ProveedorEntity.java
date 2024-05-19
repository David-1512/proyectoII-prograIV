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
@Table(name = "proveedor", schema = "proyecto_prograiv", catalog = "")
public class ProveedorEntity implements Serializable {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "correo")
    private String correo;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "contrasena")
    private String contrasena;

    @Column(name = "estado")
    private String estado;

    @Column(name = "nif")
    private String haciendaNif;

    //@OneToMany(mappedBy = "proveedorByIdProveedor")
    //private Collection<ClienteEntity> clientesById;

    //@OneToMany(mappedBy = "proveedorByIdProveedor")
   // private Collection<FacturasEntity> facturasById;

    //@OneToMany(mappedBy = "proveedorByIdProveedor")
    //private Collection<ProductoEntity> productosById;

    //@ManyToOne
    //@JoinColumn(name = "nif", referencedColumnName = "nif", nullable = false)
    //private HaciendaEntity haciendaByNif;
}
