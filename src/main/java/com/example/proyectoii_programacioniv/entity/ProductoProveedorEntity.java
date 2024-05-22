package com.example.proyectoii_programacioniv.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "producto_proveedor", schema = "proyecto2_progra4", catalog = "")
public class ProductoProveedorEntity implements Serializable {
    @Id
    @Column(name = "id_producto_proveedor")
    private String cod;

    @Column(name = "descripcion")
    private String nombre;

    @Column(name = "precio_unitario")
    private Double precio;

    @Column(name = "id_proveedor")
    private String idProveedor;

    @Column(name = "id_unidad_medida")
    private String idUnidadMedida;

    @Column(name = "id_producto_cabys")
    private String idProducto;

}
