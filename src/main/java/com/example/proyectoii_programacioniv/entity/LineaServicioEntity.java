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
@Table(name = "linea_servicio", schema = "proyecto_prograiv", catalog = "")
public class LineaServicioEntity implements Serializable {
    @Id
    @Column(name = "cod")
    private int cod;

    @Column(name = "cantidad")
    private int cantidad;

    @Column(name = "subtotal")
    private Double subtotal;

    @Column(name = "id_linea")
    private String idLinea;

    @Column(name = "cod_producto")
    private String codProducto;

    @Column(name = "num_factura")
    private String numFactura;

    /*@ManyToOne
    @JoinColumn(name = "cod_producto", referencedColumnName = "cod", nullable = false)
    private ProductoEntity productoByCodProducto;

    @ManyToOne
    @JoinColumn(name = "num_factura", referencedColumnName = "num_factura", nullable = false)
    private FacturasEntity facturasByNumFactura;*/

}
