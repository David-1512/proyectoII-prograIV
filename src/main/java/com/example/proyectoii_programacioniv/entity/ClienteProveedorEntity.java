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
@Table(name = "cliente_proveedor", schema = "proyecto2_progra4", catalog = "")
public class ClienteProveedorEntity implements Serializable {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "id_proveedor")
    private String idProveedor;

    @Column(name = "id_cliente")
    private String idCliente;
}
