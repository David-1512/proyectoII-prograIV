package com.example.proyectoii_programacioniv.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "linea_servicio", schema = "proyecto2_progra4", catalog = "")
public class LineaServicioEntity implements Serializable {
    @Id
    @Column(name = "id_linea_servicio")
    private int id;

    @Column(name = "linea_detalle")
    private String idLinea;

    @Column(name = "cantidad")
    private int cantidad;

    @Column(name = "impuesto")
    private double impuesto;

    @Column(name = "total_linea")
    private Double subtotal;

    @Column(name = "id_producto_proveedor")
    private String codProducto;

    @Column(name = "id_factura")
    private String numFactura;

}
