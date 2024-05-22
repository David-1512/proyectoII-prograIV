package com.example.proyectoii_programacioniv.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.io.Serializable;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "producto_cabys", schema = "proyecto2_progra4", catalog = "")
public class ProductoCabysEntity implements Serializable {
    @Id
    @Column(name = "id_producto_cabys")
    private String idProducto;

    @Column(name = "nombre")
    private String nombreProducto;

    @Column(name = "impuesto")
    private String impuestoProducto;
}
