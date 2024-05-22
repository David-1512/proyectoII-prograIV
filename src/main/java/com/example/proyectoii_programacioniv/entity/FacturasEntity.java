package com.example.proyectoii_programacioniv.entity;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.sql.Date;
import java.util.Collection;
import java.util.Objects;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "factura", schema = "proyecto2_progra4", catalog = "")
public class FacturasEntity implements Serializable {
    @Id
    @Column(name = "id_factura")
    private String numFactura;

    @Column(name = "consecutivo")
    private int consecutivo;

    @Column(name = "fecha")
    private Date fechEmision;

    @Column(name = "total")
    private Double total;

    @Column(name = "id_cliente")
    private String idCliente;

    @Column(name = "id_proveedor")
    private String idProveedor;

    @Column(name = "medio_pago")
    private String medioPago;
}
