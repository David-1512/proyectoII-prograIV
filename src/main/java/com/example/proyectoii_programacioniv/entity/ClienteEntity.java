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
@Table(name = "cliente", schema = "proyecto_prograiv", catalog = "")
public class ClienteEntity implements Serializable {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "correo")
    private String correo;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "id_proveedor")
    private String idProveedor;

   //@ManyToOne
   // @JoinColumn(name = "id_proveedor", referencedColumnName = "id")
    //private ProveedorEntity proveedorByIdProveedor;

   // @OneToMany(mappedBy = "clienteByIdCliente")
    //private Collection<FacturasEntity> facturasById;
}
