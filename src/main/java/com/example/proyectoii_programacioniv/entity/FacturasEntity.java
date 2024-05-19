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
@Table(name = "facturas", schema = "proyecto_prograiv", catalog = "")
public class FacturasEntity implements Serializable {
    @Id
    @Column(name = "num_factura")
    private String numFactura;

    @Column(name = "fech_emision")
    private Date fechEmision;

    @Column(name = "total")
    private Double total;

    @Column(name = "id_cliente")
    private String idCliente;

    @Column(name = "id_proveedor")
    private String idProveedor;

   /* @ManyToOne
    @JoinColumn(name = "id_cliente", referencedColumnName = "id", nullable = false)
    private ClienteEntity clienteByIdCliente;

    @ManyToOne
    @JoinColumn(name = "id_proveedor", referencedColumnName = "id", nullable = false)
    private ProveedorEntity proveedorByIdProveedor;

    @OneToMany(mappedBy = "facturasByNumFactura")
    private Collection<LineaServicioEntity> lineaServiciosByNumFactura;*/
}
