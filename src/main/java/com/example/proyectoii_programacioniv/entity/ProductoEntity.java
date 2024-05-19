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
@Table(name = "producto", schema = "proyecto_prograiv", catalog = "")
public class ProductoEntity implements Serializable {
    @Id
    @Column(name = "cod")
    private String cod;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "precio")
    private Double precio;

    @Column(name = "id_proveedor")
    private String idProveedor;

   /* @OneToMany(mappedBy = "productoByCodProducto")
    private Collection<LineaServicioEntity> lineaServiciosByCod;

    @ManyToOne
    @JoinColumn(name = "id_proveedor", referencedColumnName = "id", nullable = false)
    private ProveedorEntity proveedorByIdProveedor;*/
}
