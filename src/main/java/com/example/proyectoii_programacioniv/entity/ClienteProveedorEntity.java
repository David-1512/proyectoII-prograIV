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
@IdClass(ClienteProveedorId.class)
@Table(name = "cliente_proveedor", schema = "proyecto2_progra4", catalog = "")
public class ClienteProveedorEntity implements Serializable {
    @Id
    @Column(name = "id_proveedor")
    private String idProveedor;

    @Id
    @Column(name = "id_cliente")
    private String idCliente;
}
